import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
)

export const loginGithub = async () => {
  await supabase.auth.signIn({
    provider: 'github'
  })
}

export const loginGoogle = async () => {
  await supabase.auth.signIn({
    provider: 'google'
  })
}

export const loginTwitter = async () => {
  await supabase.auth.signIn({
    provider: 'twitter'
  })
}

export const signout = async () => {
  await supabase.auth.signOut();
}