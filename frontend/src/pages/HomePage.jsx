import React from "react";

const HomePage = () => {
  return (
    <div>
      {/* <img
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
      </h1> */}
      <div className="min-h-screen font-inter">
        {/* Hero Section */}
        <div className="relative">
          <div
            className="h-[60rem] parallax"
            style={{ backgroundImage: `url('./Budha.jpg')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
              <h1 className="font-playfair text-6xl md:text-[8rem] font-black text-blue_main animate-text">
                TravelBuddy
              </h1>
              <p className="font-inter text-xl md:text-3xl w-[80%] md:w-[60%] mt-6 tracking-wide">
                Discover new horizons, connect with fellow adventurers, and
                create unforgettable memories with TravelBuddy.
              </p>
              <a
                href="/join"
                className="mt-8 px-8 py-4 text-xl bg-blue_main text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 animate-text"
              >
                Join a Trip Now
              </a>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="py-20 px-4 md:px-16 text-center flex flex-col items-center gap-10 bg-gray-100">
          <h2 className="font-playfair text-4xl md:text-6xl font-black text-blue_main">
            Why TravelBuddy?
          </h2>
          <p className="text-lg md:text-2xl text-slate-600 w-[80%] md:w-[60%] tracking-wide">
            At TravelBuddy, we believe travel is about experiences, connections,
            and memories. Whether you're a solo traveler or a group explorer,
            our platform connects you with like-minded adventurers for
            unforgettable journeys.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="flex flex-col items-center">
              <i className="fas fa-compass text-4xl text-blue_main mb-4"></i>
              <h3 className="font-playfair text-4xl font-bold">
                Explore Together
              </h3>
              <p className="text-slate-600 text-xl mt-2">
                Join group trips tailored to your interests.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <i className="fas fa-map-marked-alt text-4xl text-blue_main mb-4"></i>
              <h3 className="font-playfair text-4xl font-bold">
                Curated Destinations
              </h3>
              <p className="text-slate-600 text-xl mt-2">
                Discover handpicked locations worldwide.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <i className="fas fa-users text-4xl text-blue_main mb-4"></i>
              <h3 className="font-playfair text-4xl font-bold">
                Build Connections
              </h3>
              <p className="text-slate-600 text-xl mt-2">
                Meet travelers who share your passion.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Destinations */}
        <div className="py-20 px-4 md:px-16 bg-white">
          <h2 className="font-playfair text-4xl md:text-6xl font-black text-center text-blue_main mb-12">
            Featured Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative rounded-2xl overflow-hidden animate-card">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Bali"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-playfair text-2xl font-bold">
                  Bali, Indonesia
                </h3>
                <p className="text-sm">
                  Beaches, temples, and vibrant culture.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden animate-card">
              <img
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Patagonia"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-playfair text-2xl font-bold">
                  Patagonia, Chile
                </h3>
                <p className="text-sm">Rugged trails and stunning glaciers.</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden animate-card">
              <img
                src="https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Santorini"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-playfair text-2xl font-bold">
                  Santorini, Greece
                </h3>
                <p className="text-sm">Whitewashed cliffs and azure waters.</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <a
              href="/destinations"
              className="px-6 py-3 bg-blue_main text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300"
            >
              Explore All Destinations
            </a>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-20 px-4 md:px-16 bg-gray-100">
          <h2 className="font-playfair text-4xl md:text-6xl font-black text-center text-blue_main mb-12">
            What Travelers Say
          </h2>
          <div className="testimonial-slider">
            <div className="px-4">
              <div className="bg-white p-8 rounded-2xl shadow-lg mx-auto max-w-lg">
                <p className="text-slate-600 italic">
                  "TravelBuddy made my solo trip to Bali unforgettable! I met
                  amazing people and explored hidden gems together."
                </p>
                <p className="mt-4 font-semibold text-blue_main">— Sarah M.</p>
              </div>
            </div>
            <div className="px-4">
              <div className="bg-white p-8 rounded-2xl shadow-lg mx-auto max-w-lg">
                <p className="text-slate-600 italic">
                  "The Patagonia trek with TravelBuddy was a dream come true.
                  The group vibe was perfect!"
                </p>
                <p className="mt-4 font-semibold text-blue_main">— James T.</p>
              </div>
            </div>
            <div className="px-4">
              <div className="bg-white p-8 rounded-2xl shadow-lg mx-auto max-w-lg">
                <p className="text-slate-600 italic">
                  "I joined a Santorini trip and made lifelong friends.
                  TravelBuddy knows how to connect adventurers!"
                </p>
                <p className="mt-4 font-semibold text-blue_main">— Emma L.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-20 px-4 md:px-16 bg-blue_main text-white text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-black mb-6">
            Join Our Adventure Community
          </h2>
          <p className="text-lg md:text-xl w-[80%] md:w-[60%] mx-auto mb-8">
            Subscribe to our newsletter for travel tips, exclusive trips, and
            updates from TravelBuddy.
          </p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 w-[80%] md:w-[40%] rounded-l-full text-black focus:outline-none"
            />
            <button className="px-6 py-3 bg-white text-blue_main font-semibold rounded-r-full hover:bg-gray-200 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-10 px-4 bg-gray-800 text-white text-center">
          <h3 className="font-playfair text-4xl font-bold mb-4">TravelBuddy</h3>
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="text-2xl">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-2xl">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-2xl">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
          <p className="text-xl">© 2025 TravelBuddy. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;  
