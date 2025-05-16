import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Loader, LockKeyholeIcon, Mail, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const LogInPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const queryClient = useQueryClient();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
    onSuccess: () => {
      toast.success("Successfull Login");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response?.data.message || "Something went wrong");
    },
  });
  // console.log(isLoading);
  const handleLogIn = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      toast.error("Please verify that you're not a robot");
      return;
    }
    loginMutation({ username, password, captchaToken });
  };

  return (
    <>
      <section className="flex justify-center h-[100svh] overflow-hidden bg-cloud_planes bg-center bg-no-repeat bg-cover items-center">
        <motion.div
          className=" absolute text-center rounded-3xl  w-[35rem] h-fit bg-gray-100 bg-opacity-[.3] backdrop-blur-sm text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to={"/"}>
            <img
              src="/TravelBuddy_Logo.svg"
              alt=""
              className="w-[13rem] mt-8 m-auto"
            />
          </Link>
          <h1 className=" mt-4 text-5xl text-gray-700 font-playfair font-black">
            Welcome Back!
          </h1>
          <p className="mt-1 text-lg">
            Please enter your details, Your Buddy awaits.
          </p>
          <form onSubmit={handleLogIn}>
            <Input
              icon={Mail}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="mx-10 mt-3 text-left text-lg hover:text-blue_main">
              <Link to="/forgot-password">Forget Password ?</Link>
            </p>
            <ReCAPTCHA
              sitekey="6Lc2Hz0rAAAAADKaleEzGRIKgDKFnzSvPVgaiHGZ"
              onChange={(token) => setCaptchaToken(token)}
              className="mt-4 mx-auto w-fit"
            />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.98 }}
              className="text-white w-[85%] font-medium py-4 my-6 text-2xl rounded-xl bg-blue_main"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <Loader className="animate-spin mx-auto" size={24} />
              ) : (
                "Login"
              )}
            </motion.button>
          </form>
          <p className="text-lg mb-3">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue_main">
              Signup
            </Link>
          </p>
        </motion.div>
      </section>
    </>
  );
};

export default LogInPage;
