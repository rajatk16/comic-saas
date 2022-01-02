import initStripe from 'stripe';
import {supabase} from '../../utils/supabase';

export default async (req, res) => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const customer = await stripe.customers.create({
    email: req.body.record.email
  });

  await supabase
    .from('accounts')
    .update({
      stripe_account: customer.id
    })
    .eq('id', req.body.record.id)

  res.send({
    message: `Stripe Customer Created: ${customer.id}`
  })
}