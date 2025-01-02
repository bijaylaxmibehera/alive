import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminEvents, deleteEvent } from "./eventSlice";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading";
import { Navbar } from "../../components/Navbar";
import Footer from "../../components/Footer";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, adminEvents } = useSelector((state) => state.events);
  const { admin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminEvents());
  }, []);

  // Calculate summary data
  const summary = adminEvents.reduce(
    (acc, event) => {
      const totalTickets = event.ticketTypes.reduce(
        (sum, ticket) => sum + ticket.total,
        0
      );
      const ticketsSold = event.ticketTypes.reduce(
        (sum, ticket) => sum + ticket.sold,
        0
      );
      const income = event.ticketTypes.reduce(
        (sum, ticket) => sum + ticket.sold * ticket.price,
        0
      );

      acc.totalEvents += 1;
      acc.totalTicketsSold += ticketsSold;
      acc.totalIncome += income;
      return acc;
    },
    { totalEvents: 0, totalTicketsSold: 0, totalIncome: 0 }
  );

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedEvent) {
      dispatch(deleteEvent(selectedEvent._id));
      closeModal();
    }
  };

  const handleEdit = () => {
    if (selectedEvent) {
      console.log(selectedEvent);
      navigate(`/${admin.name}/create-event`, { state: { selectedEvent } });
      closeModal();
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Event Dashboard</h1>

        {loading && <Loading />}
        {error && <div className="text-red-500 mb-4">Error: {error}</div>}

        {/* Summary Section */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-blue-100 border border-blue-300 rounded">
            <h3 className="text-lg font-semibold">Total Events Hosted</h3>
            <p className="text-2xl font-bold">{summary.totalEvents}</p>
          </div>
          <div className="p-4 bg-green-100 border border-green-300 rounded">
            <h3 className="text-lg font-semibold">Total Tickets Sold</h3>
            <p className="text-2xl font-bold">{summary.totalTicketsSold}</p>
          </div>
          <div className="p-4 bg-yellow-100 border border-yellow-300 rounded">
            <h3 className="text-lg font-semibold">Total Income</h3>
            <p className="text-2xl font-bold">
              ${summary.totalIncome.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Event Table */}
        {!loading && adminEvents.length > 0 && (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Time</th>
                <th className="border px-4 py-2">Total Tickets</th>
                <th className="border px-4 py-2">Sold</th>
                <th className="border px-4 py-2">Available</th>
                <th className="border px-4 py-2">Income</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminEvents.map((event) => {
                const totalTickets = event.ticketTypes.reduce(
                  (sum, ticket) => sum + ticket.total,
                  0
                );
                const ticketsSold = event.ticketTypes.reduce(
                  (sum, ticket) => sum + ticket.sold,
                  0
                );
                const income = event.ticketTypes.reduce(
                  (sum, ticket) => sum + ticket.sold * ticket.price,
                  0
                );
                const availableTickets = totalTickets - ticketsSold;
                const dateObj = new Date(event.eventDate);
                const day = dateObj.getDate();
                const month = dateObj.toLocaleString("en-US", {
                  month: "long",
                });
                const year = dateObj.getFullYear();

                return (
                  <tr key={event._id} className="text-center">
                    <td className="border px-4 py-2">{event.title}</td>
                    <td className="border px-4 py-2">
                      {day}, {month}, {year}
                    </td>
                    <td className="border px-4 py-2">
                      {event.startTime} - {event.endTime}
                    </td>
                    <td className="border px-4 py-2">{totalTickets}</td>
                    <td className="border px-4 py-2">{ticketsSold}</td>
                    <td className="border px-4 py-2">{availableTickets}</td>
                    <td className="border px-4 py-2">${income.toFixed(2)}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="text-blue-500 hover:underline mr-2"
                        onClick={() => openModal(event)}
                      >
                        <i className="fa-solid fa-pen"></i> Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => openModal(event)}
                      >
                        <i className="fa-solid fa-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {!loading && adminEvents.length === 0 && (
          <div className="text-gray-500 text-center">No events available.</div>
        )}

        {/* Modal */}
        {isModalOpen && selectedEvent && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Manage Event</h2>
              <p className="text-gray-700 mb-4">
                What would you like to do with the event{" "}
                <strong>{selectedEvent.title}</strong>?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={closeModal}
                >
                  Cancel
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
