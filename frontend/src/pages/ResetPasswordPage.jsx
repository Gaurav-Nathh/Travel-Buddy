import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, Link } from "react-router-dom";
import travel_buddy_logo from "../../public/TravelBuddy_Logo.svg"
import { Lock, Loader, ArrowLeft } from "lucide-react";
import { Input } from "../components/Input"
import toast from "react-hot-toast";
import { useAuthStore } from "../Store/authStore";

export const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetPassword, error, isLoading, message } = useAuthStore();

	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		try {
			await resetPassword(token, password);

			toast.success("Password reset successfully, redirecting to login page...");
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Error resetting password");
		}
	};

	return (
    <section className="flex justify-center h-[100svh] overflow-hidden bg-cloud_planes bg-center bg-no-repeat bg-cover items-center">
      <motion.div
      className=" absolute text-center rounded-3xl  w-[25rem] h-fit bg-gray-100 bg-opacity-[.3] backdrop-blur-sm text-gray-500"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
        <img src={travel_buddy_logo} alt="" className="w-[8rem] mt-8 m-auto"/>
        <h1 className=" mt-4 text-3xl text-gray-700 font-playfair font-black">Reset Password</h1>
				{error && <p className='text-red-500 text-sm my-4'>{error}</p>}
				{message && <p className='text-green-500 text-sm my-4'>{message}</p>}

				<form onSubmit={handleSubmit}>
					<Input
						icon={Lock}
						type='password'
						placeholder='New Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Confirm New Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-white w-[85%] font-medium py-2 my-6 text-xl rounded-xl bg-blue_main"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Set New Password"}
        </motion.button>
				</form>
        <div className="my-4 text-xs flex justify-center">
          <Link to={"/login"} className="flex items-center hover:text-blue_main">
            <ArrowLeft className="h-4 w-4 mr-2" />Back to Login
          </Link>
        </div>
		</motion.div>
    </section>
	);
};
