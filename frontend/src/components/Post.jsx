import { motion } from "framer-motion"
import { BriefcaseConveyorBelt, Compass, Handshake, Heart, MapPin, MessageCircle, Navigation, Users } from "lucide-react"
import { formatDate } from "../utils/date"

export const Post = (props) => {
  // const date = props.date;
  return (
    <motion.div
		initial={{ opacity: 0, scale: 0.9 }}
		animate={{ opacity: 1, scale: 1 }}
		exit={{ opacity: 0, scale: 0.9 }}
		transition={{ duration: 0.5 }}
    className="px-8 py-6 max-w-[40rem] min-w-[40rem] bg-slate-100 rounded-xl hover:border-2 border-blue_main border-solid duration-100"
		>
      <h2 className=" text-3xl font-semibold text-blue_main">Buddy</h2>
      <div className="flex items-center text-2xl justify-between text-gray-700 mt-4">
      <p>{props.name}</p>
      <p>
						{new Date(props.Date).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}</p>
      </div>
      <div className="flex text-2xl space-x-3 items-center my-3">
        <Users size={20}/>
        {(props.buddy > 1) ? <p>{props.buddy} Buddies</p> : <p>{props.buddy} Buddy</p>}
      </div>
      <div className="flex justify-between items-center mt-8 text-3xl text-blue_main font-medium">
          <h3>{props.from}</h3>
          <MapPin size={30} />
          <h3>{props.to}</h3>
      </div>
      <div className="flex space-x-9 mt-6 text-slate-400">
        <Heart className="hover:text-blue_main" />
        <MessageCircle className="hover:text-blue_main"/>
        <Handshake className="hover:text-blue_main"/>
      </div>
    </motion.div>
  )
}