import React from "react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <>
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12 bg-gray-100">
        {/* Left: Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h2 className="text-4xl lg:text-4xl font-bold text-tekhelet ">
            Experience the Magic of Perfect Events with{" "}
            <span className=" text-pink-500">Alive!</span>
          </h2>
          <p className="text-blue-950 text-lg mb-8 mt-4">
            Alive transforms your events into unforgettable celebrations with
            seamless planning and impeccable execution
          </p>
          <button className="bg-gradient-to-bl from-yellow-400 via-pink-500 to-red-500 text-ghost-white font-medium py-3 px-6 rounded-lg cursor-pointer transform hover:scale-105 hover:shadow-lg transition duration-300">
            <Link to="/events">Get Started</Link>
          </button>
        </div>

        {/* Right: Image Grid */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          {/* Top Left Image */}
          <div className="w-full h-48 rounded-tl-3xl overflow-hidden">
            <img
              src="https://res.cloudinary.com/bijaylaxmibehera/image/upload/v1735396773/img-2_mmpd8v.jpg"
              alt="event image"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Top Right Image */}
          <div className="w-full h-48 rounded-tr-lg overflow-hidden">
            <img
              src="https://res.cloudinary.com/bijaylaxmibehera/image/upload/v1735396762/img-3_nqafg1.jpg"
              alt="event image"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Bottom Left Image */}
          <div className="w-full h-48 rounded-bl-lg overflow-hidden">
            <img
              src="https://res.cloudinary.com/bijaylaxmibehera/image/upload/v1735396762/img-1_kccpnl.jpg"
              alt="event image"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Bottom Right Image */}
          <div className="w-full h-48 rounded-br-3xl overflow-hidden">
            <img
              src="https://res.cloudinary.com/bijaylaxmibehera/image/upload/v1735396764/img-4_ahvzc4.jpg"
              alt="event image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;