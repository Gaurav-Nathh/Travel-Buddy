import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { axiosInstance } from "../../lib/axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "../../components/Input";
import {
  Loader,
  LockKeyholeIcon,
  Mail,
  User2,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";
import { PasswordStrengthMeter } from "../../components/PasswordStrengthMeter";
import { useMutation } from "@tanstack/react-query";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();

  const { mutate: signUpMutation, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: () => {
      navigate("verify-email");
    },
    onError: (err) => {
      console.log("error");
      toast.error(err.response?.data.message || "Something went wrong");
    },
  });
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      toast.error("Please verify that you're not a robot");
      return;
    }
    signUpMutation({ name, username, email, password, captchaToken });
  };
  return (
    <>
      <section className="flex justify-center h-[100svh] overflow-hidden bg-cloud_planes bg-center bg-no-repeat bg-cover items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" absolute text-center rounded-3xl w-[35rem] h-fit bg-gray-100 bg-opacity-[.3] backdrop-blur-sm text-gray-500"
        >
          <Link to={"/"}>
            <img
              src="/TravelBuddy_Logo.svg"
              alt=""
              className="w-[13rem] mt-8 m-auto"
            />
          </Link>
          <h1 className=" mt-4 text-5xl text-gray-700 font-playfair font-black">
            Create Account
          </h1>
          <p className="mt-3 text-lg">
            Please enter your details, Your Buddy awaits.
          </p>
          <form onSubmit={handleSignUp}>
            <Input
              icon={User2}
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              icon={User2}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              icon={Mail}
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <Input
                icon={LockKeyholeIcon}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-500"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <PasswordStrengthMeter password={password} />
            <ReCAPTCHA
              sitekey="6Lc2Hz0rAAAAADKaleEzGRIKgDKFnzSvPVgaiHGZ"
              onChange={(token) => setCaptchaToken(token)}
              className="mt-4 mx-auto w-fit"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={
                isPending ||
                !name ||
                !email ||
                !password ||
                password.length < 6 ||
                !/[A-Z]/.test(password) ||
                !/[a-z]/.test(password) ||
                !/\d/.test(password) ||
                !/[!@#$%^&*(),.?":{}|<>]/.test(password)
              }
              className=" text-white w-[85%] font-medium py-4 my-6 text-2xl rounded-xl bg-blue_main"
            >
              {isPending ? (
                <Loader className=" animate-spin mx-auto" size={24} />
              ) : (
                "Sign Up"
              )}
            </motion.button>
          </form>
          <p className="text-lg mb-3">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue_main">
              {" "}
              Login
            </Link>
          </p>
        </motion.div>
      </section>
    </>
  );
};

export default SignUpPage;
