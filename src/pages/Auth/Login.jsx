import { Link } from "react-router";
import SocialLogin from "../../components/SocialLogin";
import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/FormInput";
import PasswordForm from "../../components/PasswordForm";
import { use, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { signInUser } = use(AuthContext);

  // reusable error & success function
  const showError = (message, duration = 5000) => {
    setError(message);
    setTimeout(() => setError(""), duration);
  };
  const showSuccess = (message, duration = 5000) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), duration);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        showSuccess("Login Successful");
      })
      .catch((err) => {
        showError(err.message);
      });
  };
  return (
    <section className="border-t border-black">
      <PageHeader title={"Welcome Back"} currentPath={"Login"} />

      <div className="max-w-xl mx-auto my-15">
        <form onSubmit={handleLogin}>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm"
              role="alert"
            >
              <p className="font-semibold">Registration Error:</p>
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm"
              role="alert"
            >
              <p className="font-semibold">{success}</p>
            </div>
          )}
          <h3 className="font-garamond text-2xl text-base-content font-medium  mb-3">
            Login
          </h3>
          <div className="space-y-5">
            {/* Email Fields */}
            <FormInput
              label="Email address"
              type="email"
              name="email"
              required={true}
              placeholder="Enter your email address"
            />

            {/* Password Fields */}
            <PasswordForm name="password" />
            <button className="btn-secondary">Submit</button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="grow h-px bg-gray-300"></div>
        </div>

        <SocialLogin />

        {/* Register Link */}
        <p className="text-center text-sm">
          Don’t Have An Account?{" "}
          <Link to="/register" className="text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
