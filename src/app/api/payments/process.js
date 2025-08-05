import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { amount, paymentMethod, orderId } = req.body;

    // Convert axios stripe call to fetch()
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      payment_method: paymentMethod,
      confirm: true,
      metadata: { orderId }
    });

    // Update order status (using your existing Order model)
    await Order.findByIdAndUpdate(orderId, { 
      status: 'completed',
      paymentId: paymentIntent.id
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Payment processing error:', error);
    return res.status(500).json({ 
      error: error.message || 'Payment processing failed' 
    });
  }
}