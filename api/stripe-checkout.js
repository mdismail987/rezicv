export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, planId } = req.body;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (stripeSecretKey) {
    try {
      // Dynamic import of stripe if installed
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe(stripeSecretKey);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'ReziCV Pro Lifetime Access',
                description: 'Unlimited AI Resumes, Job Tailoring, and RenderCV ATS Templates',
              },
              unit_amount: 1900, // $19.00
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin || 'http://localhost:3000'}/?session_id={CHECKOUT_SESSION_ID}&upgrade=success`,
        cancel_url: `${req.headers.origin || 'http://localhost:3000'}/?upgrade=cancelled`,
      });

      return res.status(200).json({ url: session.url });
    } catch (err) {
      console.error('Stripe session error:', err);
    }
  }

  // Fallback test mode simulation if no live key set
  return res.status(200).json({
    url: '/?upgrade=success&test_mode=simulated',
    simulated: true,
  });
}
