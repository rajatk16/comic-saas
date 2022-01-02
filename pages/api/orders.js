import initStripe from 'stripe';

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
  const transactions = await stripe.paymentIntents.list({
    customer: stripe_account
  });

  res.json({
    transactions: transactions.data
  });
}