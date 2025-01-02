import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllEvents } from "../features/admin/eventSlice";
import { EventCard } from "../components/EventCard";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const EventList = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, []);
  return (
    <>
      <Navbar />
      <div className="p-4">
        {loading && <Loading />}
        {!loading && (
          <>
            <h1 className="text-2xl font-bold">Events</h1>
            {error ? (
              <div>Error: {error}</div>
            ) : events.length === 0 ? (
              <p>No events found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {events.map((event) => (
                  <EventCard event={event} key={event._id} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EventList;
