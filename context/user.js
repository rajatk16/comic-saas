import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';

import { supabase } from '../utils/supabase';

const Context = createContext();

const Provider = ({children}) => {
  const [ user, setUser ] = useState(supabase.auth.user());

  useEffect(() => {
    supabase.auth.onAuthStateChange(() => {
      setUser(supabase.auth.user());
    });
  }, []);

  useEffect(() => {
    axios.post('/api/set-cookie', {
      event: user ? 'SIGNED_IN' : 'SIGNED_OUT',
      session: supabase.auth.session()
    })
  }, [user])

  return (
    <Context.Provider value={{user}}>
      {children}
    </Context.Provider>
  )
}

export const useUserState = () => useContext(Context);

export default Provider;