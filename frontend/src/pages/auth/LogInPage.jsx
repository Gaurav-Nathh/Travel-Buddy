import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Loader, LockKeyholeIcon, Mail } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const LogInPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    loginMutation({ username, password });
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
            <Input
              icon={LockKeyholeIcon}
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="mx-10 mt-3 text-left text-lg hover:text-blue_main">
              <Link to="/forgot-password">Forget Password ?</Link>
            </p>
            {/* {error && (
              <p className="ml-10 mt-6 text-lg text-left text-red-500">
                {error}
              </p>
            )} */}
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
