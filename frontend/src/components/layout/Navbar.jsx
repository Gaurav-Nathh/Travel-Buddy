import { Link, Navigate, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Bell } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          return null;
        }
        toast.error(err.response.data.message || "Something went wrong");
      }
    },
  });
  const queryClient = useQueryClient();
  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => axiosInstance.get("/notifications"),
    refetchInterval: 2000,
    enabled: !!authUser,
  });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => axiosInstance.get("/connections/requests"),
    enabled: !!authUser,
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  const unreadNotificationCount = notifications?.data.filter(
    (notif) => !notif.read
  ).length;
  const unreadConnectionRequestCount = connectionRequests?.data?.length;

  console.log(unreadNotificationCount);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    {
      name: "Connections",
      path: "/connections",
      count: unreadConnectionRequestCount,
    },
    { name: "MyTrip", path: "/mytrip" },
  ];

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md w-full z-50 top-0 left-0">
      <div className="w-[90%] mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"}>
          <img src="/TravelBuddy_Logo.svg" alt="" className="w-[13rem]" />
        </Link>
        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-xl text-gray-700 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="relative hover:text-blue-500 transition-colors duration-200"
              >
                {link.name}

                {link.count > 0 && (
                  <span className="absolute -top-1.5 -right-3 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                    {link.count}
                  </span>
                )}
              </Link>
            </li>
          ))}

          {/* Notification Icon */}
          <li className="flex relative">
            <Link to="/notifications" className="relative inline-block">
              <Bell className="w-6 h-6 text-gray-700 hover:text-blue-500" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                  {unreadNotificationCount}
                </span>
              )}
            </Link>
          </li>
          {authUser ? (
            <li ref={dropdownRef} className="relative">
              <button onClick={handleDropdownToggle}>
                {authUser.username}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border z-10">
                  <Link to={`/profile/${authUser.username}`}>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                      }}
                      className="w-full text-red-600 hover:bg-red-100 py-2 px-4 text-left rounded-b-lg"
                    >
                      Profile
                    </button>
                  </Link>

                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      logout();
                    }}
                    className="w-full text-red-600 hover:bg-red-100 py-2 px-4 text-left rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <ul className="flex gap-5 font-semiBold">
              <li>
                <Link
                  to={"/signup"}
                  className="block text-lg text-gray-700 hover:text-blue-500"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to={"/login"}
                  className="block text-lg text-gray-700 hover:text-blue-500"
                >
                  Log In
                </Link>
              </li>
            </ul>
          )}
        </ul>

        {/* Hamburger for Mobile */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Notification (mobile) */}
          <Link to="/notifications" className="relative inline-block">
            <Bell className="w-6 h-6 text-gray-700" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1.5 -right-1 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                {unreadNotificationCount}
              </span>
            )}
          </Link>

          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white px-4 pb-4 space-y-4 shadow-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="block text-lg text-gray-700 hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
