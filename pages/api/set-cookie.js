import { supabase } from '../../utils/supabase';

export default async (req, res) => {
  await supabase.auth.api.setAuthCookie(req, res);
}