import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { axoisInst } from "../lib/axios.js";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import travel_buddy_logo from "../../public/TravelBuddy_Logo.svg";
import { Input } from "../components/Input";
import { Loader, LockKeyholeIcon, Mail, User2 } from "lucide-react";
import {
  PasswordStrengthMeter,
  getPasswordStrength,
} from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../Store/authStore";
import axios from "axios";
import toast from "react-hot-toast";
export const SignUpPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name, username);
      navigate("/verify-email");
    } catch (error) {}
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
              src={travel_buddy_logo}
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
            <Input
              icon={LockKeyholeIcon}
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p className="ml-10 mt-6 text-lg text-left text-red-500">
                {error}
              </p>
            )}
            <PasswordStrengthMeter password={password} />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={
                isLoading ||
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
              {isLoading ? (
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
