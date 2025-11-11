import { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthContext";

const SocialLogin = () => {
  const { signInGoogleUser } = use(AuthContext);
  const handleGoogleSignIn = () => {
    signInGoogleUser()
      .then((result) => {
        console.log("google signin", result.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-gray-700 font-medium bg-white hover:bg-gray-100 transition-all duration-200 cursor-pointer mb-5"
      >
        <FcGoogle size={24} />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
