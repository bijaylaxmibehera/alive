import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById } from "../features/admin/eventSlice";
import { useParams } from "react-router";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";

const EventDetailsPage = () => {
  const dispatch = useDispatch();
  const { currentEvent, loading, error } = useSelector((state) => state.events);
  const { eventId } = useParams();

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventById(eventId));
    }
  }, []);

  const backupImg =
    "https://res.cloudinary.com/bijaylaxmibehera/image/upload/v1735847564/upcoming-events-neon-signs-vector-upcoming-events-design-template-neon-sign-light-banner-neon_iux1b4.jpg";

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-screen">
            <div className="text-xl">Loading...</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex justify-center items-center h-screen">
            <div className="text-xl text-red-500">Error: {error}</div>
          </div>
        )}

        {/* No Event Found */}
        {!loading && !error && !currentEvent && (
          <div className="flex justify-center items-center h-screen">
            <div className="text-xl">No event found</div>
          </div>
        )}

        {/* Event Details */}
        {!loading && !error && currentEvent && (
          <div>
            <div className="w-full mb-6">
              <img
                src={currentEvent.coverImage}
                alt={currentEvent.title}
                className="w-full h-80 object-cover rounded-lg"
                onError={(e) => (e.target.src = backupImg)}
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between">
              {/* Left side: Event Details */}
              <div className="w-full md:w-2/3 p-4">
                <h1 className="text-4xl font-semibold mb-4">
                  {currentEvent.title}
                </h1>
                <p className="text-lg mb-4 text-gray-400">Description: {currentEvent.description}</p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(currentEvent.eventDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Time: {currentEvent.startTime} - {currentEvent.endTime}
                </p>
                <p className="text-sm text-gray-600">
                  Location: {currentEvent.location}
                </p>

                {/* Organizer Info */}
                <div className="mt-6 p-4 border rounded-lg shadow-md">
                  <h3 className="font-semibold text-xl">
                    Organized by : {currentEvent.organizer.name}
                  </h3>
                </div>
              </div>

              {/* Right side: Buy Ticket Button */}
              <div className="w-full md:w-1/3 p-4 flex items-center justify-center">
                <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300">
                  Buy Ticket
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EventDetailsPage;
