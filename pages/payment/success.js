import { supabase } from "../../utils/supabase";

export default () => (
  <div>
    Payment Successful
  </div>
)

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