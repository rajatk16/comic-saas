import { useEffect } from "react"
import { useRouter } from "next/router"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { signout, supabase } from "../utils/supabase"

const Signout = () => {
  const router = useRouter()
  useEffect(() => {
    const logout = async () => {
      await signout();
      router.push('/')
    }
    logout();
  }, [])
  return (
    <div className="flex flex-col items-center justify-center h-5/6">
      <FontAwesomeIcon 
        icon={faSpinner} 
        size="10x" 
        color="#89CFF0" 
        className="animate-spin duration-75"   
      />
      <div className="mt-5 text-gray-500">
        Signing Out...
      </div>
    </div>
  )
}

export const getServerSideProps = async ({req}) => {
  const {user} = await supabase.auth.api.getUserByCookie(req);
  
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      },
      props: {}
    }
  }

  return {
    props: {}
  }
}

export default Signout;