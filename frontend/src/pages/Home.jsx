import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import { Navbar } from "../components/Navbar";

export const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <section className="my-8 p-6 bg-slate-50 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Browse Events by Category
        </h2>
        <div className="flex justify-center space-x-8">
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <li className="flex flex-col items-center justify-center p-4 border rounded-lg hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="w-20 h-20 flex items-center justify-center bg-blue-200 rounded-full mb-4">
                <i className="fa-solid fa-music text-2xl text-blue-600"></i>
              </div>
              <p className="text-lg font-semibold">Music</p>
            </li>
            <li className="flex flex-col items-center justify-center p-4 border rounded-lg hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="w-20 h-20 flex items-center justify-center bg-yellow-200 rounded-full mb-4">
                <i className="fa-solid fa-masks-theater text-2xl text-yellow-600"></i>
              </div>
              <p className="text-lg font-semibold">Party</p>
            </li>
            <li className="flex flex-col items-center justify-center p-4 border rounded-lg hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="w-20 h-20 flex items-center justify-center bg-pink-200 rounded-full mb-4">
                <i className="fa-solid fa-cake-candles text-2xl text-pink-600"></i>
              </div>
              <p className="text-lg font-semibold">Birthdays</p>
            </li>
            <li className="flex flex-col items-center justify-center p-4 border rounded-lg hover:shadow-lg transition-transform transform hover:scale-105">
              <div className="w-20 h-20 flex items-center justify-center bg-green-200 rounded-full mb-4">
                <i className="fa-solid fa-laptop text-2xl text-green-600"></i>
              </div>
              <p className="text-lg font-semibold">Meetings</p>
            </li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
};
