import React from "react";

const HomePage = () => {
  return (
    <div>
      <img
        src="./Budha.jpg"
        alt=""
        className="w-[95%] h-[60rem] origin-top mt-10 m-auto object-cover  rounded-3xl"
      />
      <div className=" font-playfair text-center flex flex-col items-center gap-10 mt-16">
        <h1 className="text-blue_main text-6xl font-black">TravelBuddy</h1>
        <p className="text-[1.5rem] text-slate-600 w-[70%] tracking-wide">
          At Travel Together, we believe that travel is more than just a
          destination—it's about the experiences, the connections, and the
          memories you make along the way. Whether you're a solo traveler
          looking to meet new friends, or a group of explorers wanting to expand
          your circle, Travel Together is your go-to platform for connecting
          with like-minded adventurers.
        </p>
      </div>
      <h1 className="animetext text-[13vw] font-black text-center">
        TravelBuddy
      </h1>
    </div>
  );
};

export default HomePage;
