import { getFunctions, httpsCallable } from "firebase/functions";
import { loadStripe } from "@stripe/stripe-js";

export const handleCheckout = async ({ cartItems, total, email, name, surname, address, setErrors, setIsLoading, validateCheckoutForm }) => {
  const newErrors = validateCheckoutForm({ email, name, surname, address });
  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  setIsLoading(true);

  try {
    const functions = getFunctions();
    const createCheckoutSession = httpsCallable(functions, 'createCheckoutSession');

    const itemsForCheckout = cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const res = await createCheckoutSession({
      items: itemsForCheckout,
      total,
      shippingAddress: { email, name, surname, address },
    });

    console.log('Stripe checkout session response:', res.data);
    if (res.data.success) {
      const stripe = await loadStripe('pk_test_51Rkp4WQSpU8nZlSpfbWnz6z1jVE8LVxs1CMyTCLYGngUuv7UI6CftLMmHYZPHiRqWGuzNaF6IND0yndFMrSHBSd800wz9ot8f4');
      await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
    } else {
      alert("Error creating checkout session: " + res.data.error);
    }
  } catch (error) {
    alert("Error while handling payment: " + error.message);
  }
};
