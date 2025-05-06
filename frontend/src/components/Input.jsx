export const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mx-10 mt-7 flex items-center">
      <Icon size={20} className = "absolute ml-3"></Icon>
      <input {...props} 
      className=" w-full py-3 pl-16 text-xl outline-2 outline outline-white hover:outline-[#6F85DF] rounded-lg duration-500"/>
    </div>
  )
}