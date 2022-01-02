import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { loginGithub, loginGoogle, loginTwitter } from "../utils/supabase";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen relative -top-5">
      <div className="border-2 rounded pt-2 pb-10 text-center w-2/6 h-">
      <div className="my-5">
        <h1 className="text-5xl mb-5">Sign In or Sign Up</h1>
        <p> And Enter the World of Comics!!</p>
      </div>
      <div className="flex justify-evenly">
        <FontAwesomeIcon 
          icon={faGithub} 
          size="5x" 
          className="duration-500 hover:shadow-2xl cursor-pointer"   
          onClick={loginGithub}
        />
        <FontAwesomeIcon 
          icon={faGoogle} 
          size="5x" 
          className="duration-500 hover:shadow-2xl cursor-pointer" 
          color="#4285F4" 
          onClick={loginGoogle}  
        />
        <FontAwesomeIcon 
          icon={faTwitter} 
          size="5x" 
          className="duration-500 hover:shadow-2xl cursor-pointer" 
          color="#00ACEE" 
          onClick={loginTwitter}
        />
      </div>
      </div>
    </div>
  )
}

export default Login;