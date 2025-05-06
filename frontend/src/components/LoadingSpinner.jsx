import { motion } from "framer-motion";
import travel_buddy_logo from "../../public/TravelBuddy_Logo.svg"

const LoadingSpinner = () => {
  return (
    <div className='min-h-screen flex flex-col items-center bg-white  justify-center relative overflow-hidden'>
			<motion.div
				className='w-16 h-16 border-4 border-t-4 border-t-black border-blue_main rounded-full'
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			/>
      <img src={travel_buddy_logo} alt="" className="mt-6 w-[20%]"/>
		</div>
  )
}

export default LoadingSpinner;