import React, { useEffect, useState } from 'react';
import '../styles/PaymentSuccess.css';
import verify from '../assets/icons/verify.svg';
import alertError from '../assets/icons/alert-error.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
  const [verified, setVerified] = useState(null);
  const searchParams = new URLSearchParams(window.location.search);
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  }
  useEffect(() => {
    if (sessionId) {
      fetch('https://us-central1-cyber-shop-a836b.cloudfunctions.net/verifyPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: sessionId })
      })
      .then(response => response.json())
      .then(data => {
        setVerified(data.paid || false);
      })
      .catch(error => {
        console.error("Verification error:", error);
        setVerified(false);
      });
    } else {
      setVerified(false);
    }
  }, [sessionId]);

  if (verified === null) return (
    <div className="loading-container">
      <p>Checking payment...</p>
      <span className="spinner"></span>
    </div>
    );
  if (verified === false) return (
    <div className="payment-results failed">
      <img src={alertError} className="payment-result-icon" alt="success"/>
      <h2 className="bold">Payment Failed</h2>
      <button onClick={handleClick}className="btn transparent-black">Back to home</button>
      <div>
        <p>Payment was canceled or an error occured.</p>
        <p>Keep getting this message? <Link style={{color: "rgb(52,85,192)"}}>Contact Support</Link></p>
      </div>
    </div>   
  );

  return (
    <div className="payment-results">
      <img src={verify} className="payment-result-icon" alt="success"/>
      <h2 className="bold">Payment Successful</h2>
      <div>
        <p className="grey">Thank you for your purchase! Your order will be proccessed shortly!</p>
        <p className="grey">For order status updates please check e-mail you specified in order details.</p>
      </div>
      <button onClick={handleClick}className="btn transparent-black">Continue shopping</button>
    </div>
  );
}

