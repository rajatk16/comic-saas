import initStripe from 'stripe'
import { supabase } from '../../utils/supabase';

export default async (req, res) => {
  const {user} = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    })
  }

  const { data: { stripe_account }} = await supabase
    .from('accounts')
    .select('stripe_account')
    .eq('id', user.id)
    .single();

  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const {cart} = req.body;
  const line_items = cart.map(item => {
    return {
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.title,
          description: item.description,
          images: [
            item.imageUrl
          ],
        },
        unit_amount: item.price * 70 * 100
      },
      description: item.description,
      quantity: item.quantity
    }
  })

  const session = await stripe.checkout.sessions.create({
    customer: stripe_account,
    mode: 'payment',
    payment_method_types: ['card'],
    line_items,
    success_url: `${process.env.CLIENT_URL}/payment/success`,
    cancel_url: `${process.env.CLIENT_URL}/payment/cancelled`
  })

  res.json({
    id: session.id
  })
}