import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import travel_buddy_logo from "../../public/TravelBuddy_Logo.svg"
import { motion } from "framer-motion";
import { useAuthStore } from "../Store/authStore";
import toast from 'react-hot-toast';

export const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleChange = ( index, value ) => {
    const newCode = [...code];

    if( value.length > 1 ) {
      const pastedCode = value.slice(0, 6).split("");
      for(let i = 0; i < 6; i++ ) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if( value && index < 5 ) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = ( index, e ) => {
    if ( e.key === "Backspace" && !code[index] && index > 0 ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try{
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email verified successfully!");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  },[code])

  return (
    <>
      <section className="flex justify-center h-[100svh] overflow-hidden bg-cloud_planes bg-center bg-no-repeat bg-cover">
      <motion.div 
      initial={{ opacity: 0, y: -50}}
      animate={{ opacity:1, y:0 }}
      transition={{ duration: 0.5 }}
      className=" absolute text-center rounded-3xl top-[30%] -translate-y-[30%] w-[25rem] h-fit bg-gray-100 bg-opacity-[.3] backdrop-blur-sm text-gray-500">
        <img src={travel_buddy_logo} alt="" className="w-[8rem] mt-7 m-auto"/>
        <h1 className=" mt-3 text-4xl text-gray-700 font-playfair font-black">Verify Your Email!</h1>
        <p className="mt-1 text-sm">Enter the 6-digit code sent to your email address</p>
        <form onSubmit={handleSubmit} className=" mx-7 my-5">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input 
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="6"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 h-12 text-3xl text-center font-bold text-blue_main outline-2 outline outline-white hover:outline-[#6F85DF] cursor-pointer rounded-lg duration-500"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-left mt-4">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full bg-blue_main py-3 mt-7 text-white font-bold text-xl rounded-xl"
          >
            {isLoading ? "Verifying...":"Verify Email"}
          </motion.button>
        </form>
      </motion.div>
      </section> 
    </>
  )
}