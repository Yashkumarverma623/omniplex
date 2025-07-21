import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(req: NextRequest) {
  try {
    // Get the origin from the request headers
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_DOMAIN;
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Pro Plan',
              description: 'Upgrade to Pro features',
            },
            unit_amount: 1000, // $10.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      // Optional: Add metadata for tracking
      metadata: {
        plan: 'pro',
        // You can add user ID here if you have user authentication
        // userId: userId,
      },
      // Optional: Collect customer information
      billing_address_collection: 'auto',
      // Optional: Add customer email collection
      customer_creation: 'always',
    });
    
    return NextResponse.json({ 
      id: session.id,
      url: session.url 
    });
    
  } catch (err: any) {
    console.error('Stripe error:', err);
    
    // Return more specific error information
    return NextResponse.json(
      { 
        error: err.message || 'An error occurred while creating the checkout session',
        type: err.type || 'api_error'
      },
      { status: err.statusCode || 500 }
    );
  }
}

// Optional: Add a GET method for testing
export async function GET() {
  return NextResponse.json({ 
    message: 'Stripe Checkout API is running',
    timestamp: new Date().toISOString()
  });
}