'use client';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';

let stripePromise: Promise<any> | null = null;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = async () => {
    if (!mounted) return;
    
    setLoading(true);
    
    try {
      const stripe = await getStripe();
      
      if (!stripe) {
        console.error('Stripe failed to load');
        return;
      }
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), 
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      const session = await response.json();
      
      if (session.error) {
        console.error('Session error:', session.error);
        return;
      }
      
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      
      if (result.error) {
        console.error('Redirect error:', result.error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <button 
        disabled
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }

  return (
     <div className="flex justify-center items-center min-h-[200px]">
    <button 
      onClick={handleCheckout}
      disabled={loading}
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex "
    >
      {loading ? 'Loading...' : 'Buy Pro Plan - $10'}
    </button>
  </div>
  );
}