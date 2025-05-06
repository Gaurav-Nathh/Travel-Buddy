import { Menu, X } from "lucide-react";
import travel_buddy_logo from "../../public/TravelBuddy_Logo.svg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";

export const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const toggleNavDown = () => setIsOpenNav(!isOpenNav);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Successfully Loged Out!");
  };

  const checkWindowWidth = () => {
    if (window.innerWidth <= 900) {
      setOpenNav(true);
    } else {
      setOpenNav(false);
    }
  };

  useEffect(() => {
    checkWindowWidth();
    window.addEventListener("resize", checkWindowWidth);
    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, []);

  return (
    <nav className="mt-8 p-8 rounded-3xl bg-white bg-transparent text-gray-700 font-semibold m-auto flex justify-between items-center w-[95%]">
      <Link>
        <img
          src={travel_buddy_logo}
          alt=""
          className="w-[16rem] min-w-[10rem]"
        />
      </Link>
      <div className="">
        {isOpenNav ? (
          <ul className="absolute h-[90svh] mt-10 left-0 text-3xl bg-white text-center space-y-[5rem] w-full gap-8">
            <li className="hover:bg-gray-200 p-4 rounded-xl duration-500">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="hover:bg-gray-200 p-4 rounded-xl duration-500">
              <Link to={"/explore"}>Explore</Link>
            </li>
            <li className="hover:bg-gray-200 p-4 rounded-xl duration-500">
              <Link to={"/my-trips"}>My Trips</Link>
            </li>
            <li className="hover:bg-gray-200 p-4 rounded-xl duration-500">
              <Link to={"/community"}>Community</Link>
            </li>
          </ul>
        ) : (
          <ul className={"gap-20 text-3xl " + (openNav ? "hidden" : "flex")}>
            <li className="hover:border-b-2 hover:border-blue_main py-3">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="hover:border-b-2 hover:border-blue_main py-3">
              <Link to={"/explore"}>Explore</Link>
            </li>
            <li className="hover:border-b-2 hover:border-blue_main py-3">
              <Link to={"/my-trips"}>My Trips</Link>
            </li>
            <li className="hover:border-b-2 hover:border-blue_main py-3">
              <Link to={"/community"}>Community</Link>
            </li>
          </ul>
        )}
      </div>
      <div className="flex items-center text-2xl">
        <div>
          {isAuthenticated ? (
            <>
              
              <button
                onClick={toggleDropdown}
                className="border-gray-300 hover:border-blue_main focus:border-blue_main"
              >
                {user.username}
              </button>
              {isOpen && (
                <div className="absolute right-0 z-10 mt-2 mr-9 w-56 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-lg hover:bg-gray-100"
                      role="menuitem"
                    >
                      <Link to={`/profile:${user.username}`}>
                        Account settings
                      </Link>
                    </a>
                    <a
                      className="text-gray-700 block px-4 py-2 text-lg hover:bg-gray-100"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </a>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex  gap-4">
                <button className="hover:border-blue_main border-2 border-gray-200 border-solid py-2 px-4 rounded-full duration-500">
                  <Link to={"/login"}>Log In</Link>
                </button>
                <button className="hover:border-blue_main border-2 border-gray-200 border-solid py-2 px-4 rounded-full duration-500">
                  <Link to={"/signup"}>Sign up</Link>
                </button>
              </div>
            </>
          )}
        </div>
        {/* {openNav && (<Menu onClick={toggleNavDown} className="ml-5"/>)} */}
        {openNav &&
          (isOpenNav ? (
            <X onClick={toggleNavDown} size={30} className="ml-5" />
          ) : (
            <Menu onClick={toggleNavDown} size={30} className="ml-5" />
          ))}
      </div>
    </nav>
  );
};
