import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../../components/SocialLogin";
import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/FormInput";
import PasswordForm from "../../components/PasswordForm";
import { updateProfile } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import useMessage from "../../hooks/useMessage";
import AlertMessage from "../../components/AlertMessage";

const Register = () => {
  const { error, success, showError, showSuccess } = useMessage();
  const { createUser } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const terms = e.target.terms.checked;
    // console.log(email, name, password, photo, terms);

    const pass6Pattern = /^.{6,}$/;
    const passUpperCasePattern = /(?=.*[A-Z])/;
    const passLowerCasePattern = /(?=.*[a-z])/;
    // Password Validation
    if (!pass6Pattern.test(password)) {
      showError("Minimum 6 characters required");
      return;
    }
    if (!passUpperCasePattern.test(password)) {
      showError("Missing uppercase letter.");
      return;
    }
    if (!passLowerCasePattern.test(password)) {
      showError("Missing lowercase letter.");
      return;
    }
    // Accept Terms and Condition
    if (!terms) {
      showError("You must accept the Terms & Conditions.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        // console.log(result.user);
        showSuccess("Registration Successful");

        //update profile
        const profile = {
          displayName: name,
          photoURL: photo,
        };
        updateProfile(result.user, profile);
        navigate(location.state || "/");
      })
      .catch((err) => {
        // console.log(err);
        showError(err.message || "Registration Failed");
      });

    // console.log("register submitted");
  };
  return (
    <section className="border-t border-black">
      <PageHeader title={"Create Account"} currentPath={"Register"} />

      <div className="max-w-xl mx-auto my-15 px-4 md:px-0">
        <form onSubmit={handleRegister}>
          {/* reusable messages */}
          <AlertMessage type="error" message={error} />
          <AlertMessage type="success" message={success} />

          <h3 className="font-garamond text-2xl text-base-content font-medium  mb-3">
            Register
          </h3>
          <div className="space-y-5">
            {/* Name Fields */}
            <FormInput
              label="Your Name"
              type="text"
              name="name"
              required={true}
              placeholder="Enter your name"
            />

            {/* Photo URL Fields */}
            <FormInput
              label="Photo URL"
              type="url"
              name="photo"
              required={true}
              placeholder="Enter your Photo URL"
            />

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

            {/* Terms and condition Fields */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="terms"
                className="checkbox rounded-sm checkbox-primary checkbox-xs"
              />
              <span className="text-sm">
                Accept <strong>Terms & Condition</strong>
              </span>
            </div>
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
        {/* {error} */}
        {/* Login Link */}
        <p className="text-center text-sm">
          Have an account?{" "}
          <Link to="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
