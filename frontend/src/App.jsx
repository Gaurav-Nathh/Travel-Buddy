import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/auth/SignUpPage";
import LogInPage from "./pages/auth/LogInPage";
import Layout from "./components/layout/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import EmailVerificationPage from "./pages/auth/EmailVerificationPage";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Explore from "./pages/Explore";
import MyTrip from "./pages/MyTrip";
import { fetchAuthUser } from "./queries/authQueries";
import Connection from "./pages/Connection";
import ProfilePage from "./pages/ProfilePage";

function App() {
  // const { data: authUser, isLoading } = useQuery({
  //   queryKey: ["authUser"],
  //   queryFn: async () => {
  //     try {
  //       const res = await axiosInstance.get("/auth/me");
  //       return res.data;
  //     } catch (err) {
  //       if (err.response && err.response.status === 401) {
  //         return null;
  //       }
  //       toast.error(err.response.data.message || "Something went wrong");
  //     }
  //   },
  // });
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
  });

  if (isLoading) return null;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route
          path="/signup/verify-email"
          element={<EmailVerificationPage />}
        />
        <Route path="/explore" element={<Explore />} />
        <Route
          path="/connections"
          element={authUser ? <Connection /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/mytrip"
          element={authUser ? <MyTrip /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/profile/:username"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;
