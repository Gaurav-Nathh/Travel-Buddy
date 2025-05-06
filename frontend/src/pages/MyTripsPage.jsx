import { Navbar } from "../components/Navbar";
import { Transition } from "../components/Transition";
import PostCreation from "../layout/PostCreation";

export const MyTripsPage = () => {
  return (
    <>
      <Navbar />
      <div className="bord w-full h-[100svh] flex justify-center pt-8">
        <div>
          <PostCreation></PostCreation>
        </div>
      </div>
    </>
  );
};
