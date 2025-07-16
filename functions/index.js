/* eslint-disable */
const { onCall, onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");

admin.initializeApp();
const db = admin.firestore();

const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");
const stripeWebhookSecret = defineSecret("STRIPE_WEBHOOK_SECRET");

exports.createCheckoutSession = onCall(
  { secrets: [stripeSecretKey] },
  async (request) => {
    try {
      logger.info("Webhook checkout");

      const now = admin.firestore.Timestamp.now();
      const oneHourAgo = admin.firestore.Timestamp.fromMillis(now.toMillis() - 60 * 60 * 1000);

      const rateLimitQuery = await db
        .collection("rate_limit")
        .where("createdAt", ">=", oneHourAgo)
        .get();

      if (rateLimitQuery.size >= 5) {
        logger.warn("Rate limit exceeded");
        return { success: false, error: "Too many orders in last hour. Please retry later." };
      }

      await db.collection("rate_limit").add({ createdAt: now });

      const secretKey = stripeSecretKey.value();
      const stripe = require("stripe")(secretKey);

      const data = request.data;
      const itemsFromClient = data.items || [];

      const productPromises = itemsFromClient.map(({ productId }) =>
        db.collection("products").doc(productId).get()
      );
      const productDocs = await Promise.all(productPromises);

      let total = 0;
      const line_items = [];

      for (let i = 0; i < itemsFromClient.length; i++) {
        const productDoc = productDocs[i];
        if (!productDoc.exists) {
          throw new Error(`Product ${itemsFromClient[i].productId} not found`);
        }

        const productData = productDoc.data();
        const quantity = itemsFromClient[i].quantity;
        const price = productData.price;

        line_items.push({
          price_data: {
            currency: "usd",
            product_data: { name: productData.title },
            unit_amount: Math.round(price * 100),
          },
          quantity,
        });

        total += price * quantity;
      }

      const metadata = {
        shippingAddress: JSON.stringify(data.shippingAddress || {}),
        total: total.toString(),
        items: JSON.stringify(itemsFromClient.map(({ productId, quantity }) => ({
        productId,
        quantity,
        }))),
      };

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: "https://cyber-shop-flax.vercel.app/", // soon will be changed to proper links
        cancel_url: "https://cyber-shop-flax.vercel.app/",  
        metadata,
      });

      return { success: true, sessionId: session.id };
    } catch (error) {
      logger.error("Error creating Stripe session:", error);
      return { success: false, error: error.message };
    }
  }
);

exports.handleStripeWebhook = onRequest(
  { secrets: [stripeSecretKey, stripeWebhookSecret], rawBody: true },
  async (req, res) => {
    try {
      logger.info("Webhook received");
      logger.info("Headers:", req.headers);
      logger.info("Stripe signature header:", req.headers["stripe-signature"]);
      logger.info("RawBody length:", req.rawBody?.length);

      const secretKey = stripeSecretKey.value();
      const stripe = require("stripe")(secretKey);

      const webhookSecret = stripeWebhookSecret.value();

      const sig = req.headers["stripe-signature"];
      const buf = req.rawBody;

      let event;
      try {
        event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      } catch (err) {
        logger.error("Webhook signature verification failed.", err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const shippingAddress = JSON.parse(session.metadata.shippingAddress || "{}");
        const total = parseFloat(session.metadata.total) || 0;
        const items = JSON.parse(session.metadata.items || "[]");

        if (total > 0 && items.length > 0) {
            const orderDocRef = admin.firestore().collection("orders").doc(session.payment_intent);
            await orderDocRef.set({
            items,
            total,
            shippingAddress,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            status: "paid",
            stripeSessionId: session.id,
            }, { merge: true });
        }
      }

      res.status(200).send("Webhook received");
    } catch (error) {
      logger.error("Error handling webhook:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);
