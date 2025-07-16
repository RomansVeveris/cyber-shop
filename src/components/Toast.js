import React, { useEffect } from "react";
import '../styles/Toast.css';
import verify from '../assets/icons/verify.svg';

export default function Toast({message, visible, onClose}) {
    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout();
        } 
    }, [visible, onClose]);
    if (!visible) return null;
    return <div className="toast"><img src={verify} alt="product added to cart"/>{message}</div>;
}