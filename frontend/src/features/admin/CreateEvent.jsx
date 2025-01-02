// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createEvent, updateEvent } from "./eventSlice";
// import { useNavigate, useLocation } from "react-router-dom";
// import Loading from "../../components/Loading";
// import { Navbar } from "../../components/Navbar";
// import Footer from "../../components/Footer";

// const CreateEvent = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { loading, error } = useSelector((state) => state.events);

//   // Check if editing an event
//   const editingEvent = location.state?.selectedEvent;

//   // State for event data
//   const [eventData, setEventData] = useState({
//     title: "",
//     description: "",
//     eventDate: "",
//     startTime: "",
//     endTime: "",
//     location: "",
//     category: "",
//     mode: "offline",
//     isFree: false,
//     ticketTypes: [],
//   });

//   const [coverImage, setCoverImage] = useState(null);
//   const [newTicket, setNewTicket] = useState({ type: "", price: 0, total: 0 });

//   useEffect(() => {
//     if (editingEvent) setEventData(editingEvent);
//   }, [editingEvent]);

//   const categories = [
//     "party",
//     "holidays",
//     "meeting",
//     "business",
//     "hobbies",
//     "dating",
//     "music",
//     "classical",
//     "concert",
//     "mental health",
//     "wedding",
//     "birthday",
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEventData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleImageChange = (e) => setCoverImage(e.target.files[0]);

//   const handleTicketChange = (e) => {
//     const { name, value } = e.target;
//     setNewTicket((prev) => ({
//       ...prev,
//       [name]:
//         name === "price" || name === "total"
//           ? value === ""
//             ? ""
//             : Number(value)
//           : value,
//     }));
//   };

//   const addTicket = () => {
//     if (newTicket.type && newTicket.price > 0 && newTicket.total > 0) {
//       setEventData((prev) => ({
//         ...prev,
//         ticketTypes: [...prev.ticketTypes, { ...newTicket, sold: 0 }],
//       }));
//       setNewTicket({ type: "", price: 0, total: 0 });
//     }
//   };

//   const removeTicket = (index) => {
//     setEventData((prev) => ({
//       ...prev,
//       ticketTypes: prev.ticketTypes.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.entries(eventData).forEach(([key, value]) => {
//       if (key === "ticketTypes") {
//         formData.append(key, JSON.stringify(value));
//       } else {
//         formData.append(key, value);
//       }
//     });
//     if (coverImage) formData.append("coverImage", coverImage);

//     const action = editingEvent
//       ? updateEvent({ eventId: editingEvent._id, updatedData: formData })
//       : createEvent(formData);

//     dispatch(action)
//       .unwrap()
//       .then(() => navigate("/dashboard"))
//       .catch((error) => console.error("Event action failed:", error));
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-2xl font-bold mb-6">
//           {editingEvent ? "Update Event" : "Create Event"}
//         </h1>
//         {loading && <Loading />}
//         {error && <div className="text-red-500 mb-4">Error: {error}</div>}

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 gap-4"
//           encType="multipart/form-data"
//         >
//           <input
//             type="text"
//             name="title"
//             placeholder="Event Title"
//             value={eventData.title}
//             onChange={handleChange}
//             className="border rounded p-2"
//             required
//           />
//           <textarea
//             name="description"
//             placeholder="Event Description"
//             value={eventData.description}
//             onChange={handleChange}
//             className="border rounded p-2"
//             rows={4}
//             required
//           />
//           <input
//             type="date"
//             name="eventDate"
//             value={eventData.eventDate}
//             onChange={handleChange}
//             className="border rounded p-2"
//             required
//           />
//           <input
//             type="time"
//             name="startTime"
//             value={eventData.startTime}
//             onChange={handleChange}
//             className="border rounded p-2"
//             required
//           />
//           <input
//             type="time"
//             name="endTime"
//             value={eventData.endTime}
//             onChange={handleChange}
//             className="border rounded p-2"
//             required
//           />
//           <input
//             type="text"
//             name="location"
//             placeholder="Event Location"
//             value={eventData.location}
//             onChange={handleChange}
//             className="border rounded p-2"
//             required
//           />
//           <select
//             name="category"
//             value={eventData.category}
//             onChange={handleChange}
//             className="border rounded p-2"
//             required
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//           <select
//             name="mode"
//             value={eventData.mode}
//             onChange={handleChange}
//             className="border rounded p-2"
//             required
//           >
//             <option value="offline">Offline</option>
//             <option value="online">Online</option>
//           </select>
//           <label className="inline-flex items-center">
//             <input
//               type="checkbox"
//               name="isFree"
//               checked={eventData.isFree}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             Is this event free?
//           </label>
//           <input
//             type="file"
//             name="coverImage"
//             onChange={handleImageChange}
//             className="border rounded p-2"
//             accept=".jpeg, .jpg, .png"
//           />

//           {!eventData.isFree && (
//             <div>
//               <h2 className="text-lg font-bold mb-2">Add Tickets</h2>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
//                 <input
//                   type="text"
//                   name="type"
//                   placeholder="Ticket Type"
//                   value={newTicket.type}
//                   onChange={handleTicketChange}
//                   className="border rounded p-2"
//                   required
//                 />
//                 <input
//                   type="number"
//                   name="price"
//                   placeholder="Ticket Price"
//                   value={newTicket.price}
//                   onChange={handleTicketChange}
//                   className="border rounded p-2"
//                   required
//                 />
//                 <input
//                   type="number"
//                   name="total"
//                   placeholder="Total Tickets"
//                   value={newTicket.total}
//                   onChange={handleTicketChange}
//                   className="border rounded p-2"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={addTicket}
//                   className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//                 >
//                   Add Ticket
//                 </button>
//               </div>
//             </div>
//           )}

//           {eventData.ticketTypes.length > 0 && (
//             <div className="mt-4">
//               <h3 className="font-bold mb-2">Added Tickets</h3>
//               {eventData.ticketTypes.map((ticket, index) => (
//                 <div
//                   key={index}
//                   className="flex justify-between items-center border p-2 rounded mb-2"
//                 >
//                   <span>
//                     {ticket.type} - ${ticket.price} (Total: {ticket.total})
//                   </span>
//                   <button
//                     type="button"
//                     onClick={() => removeTicket(index)}
//                     className="text-red-500"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//           >
//             {editingEvent ? "Update Event" : "Create Event"}
//           </button>
//         </form>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CreateEvent;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, updateEvent } from "./eventSlice";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import { Navbar } from "../../components/Navbar";
import Footer from "../../components/Footer";

const CreateEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.events);

  const editingEvent = location.state?.selectedEvent;

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    location: "",
    category: "",
    mode: "offline",
    isFree: false,
    ticketTypes: [],
  });

  const [coverImage, setCoverImage] = useState(null);
  const [newTicket, setNewTicket] = useState({ type: "", price: 0, total: 0 });

  useEffect(() => {
    if (editingEvent) setEventData(editingEvent);
  }, [editingEvent]);

  const categories = [
    "party",
    "holidays",
    "meeting",
    "business",
    "hobbies",
    "dating",
    "music",
    "classical",
    "concert",
    "mental health",
    "wedding",
    "birthday",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => setCoverImage(e.target.files[0]);

  const handleTicketChange = (e) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "total"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const addTicket = () => {
    if (newTicket.type && newTicket.price > 0 && newTicket.total > 0) {
      setEventData((prev) => ({
        ...prev,
        ticketTypes: [...prev.ticketTypes, { ...newTicket, sold: 0 }],
      }));
      setNewTicket({ type: "", price: 0, total: 0 });
    } else {
      alert("Please fill all ticket fields with valid values.");
    }
  };

  const removeTicket = (index) => {
    setEventData((prev) => ({
      ...prev,
      ticketTypes: prev.ticketTypes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(eventData).forEach(([key, value]) => {
      if (key === "ticketTypes") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    if (coverImage) formData.append("coverImage", coverImage);

    const action = editingEvent
      ? updateEvent({ eventId: editingEvent._id, updatedData: formData })
      : createEvent(formData);

    dispatch(action)
      .unwrap()
      .then(() => navigate("/"))
      .catch((error) => console.error("Event action failed:", error));
  };

  // Get today's date in yyyy-MM-dd format for min value
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">
          {editingEvent ? "Update Event" : "Create Event"}
        </h1>
        {loading && <Loading />}
        {error && <div className="text-red-500 mb-4">Error: {error}</div>}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4"
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={eventData.title}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={eventData.description}
            onChange={handleChange}
            className="border rounded p-2"
            rows={4}
            required
          />
          <input
            type="date"
            name="eventDate"
            value={eventData.eventDate}
            min={getTodayDate()}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="time"
            name="startTime"
            value={eventData.startTime}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="time"
            name="endTime"
            value={eventData.endTime}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Event Location"
            value={eventData.location}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <select
            name="category"
            value={eventData.category}
            onChange={handleChange}
            className="border rounded p-2"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            name="mode"
            value={eventData.mode}
            onChange={handleChange}
            className="border rounded p-2"
            required
          >
            <option value="offline">Offline</option>
            <option value="online">Online</option>
          </select>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="isFree"
              checked={eventData.isFree}
              onChange={handleChange}
              className="mr-2"
            />
            Is this event free?
          </label>
          <input
            type="file"
            name="coverImage"
            onChange={handleImageChange}
            className="border rounded p-2"
            accept=".jpeg, .jpg, .png"
          />

          {!eventData.isFree && (
            <div>
              <h2 className="text-lg font-bold mb-2">Add Tickets</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                <input
                  type="text"
                  name="type"
                  placeholder="Ticket Type"
                  value={newTicket.type}
                  onChange={handleTicketChange}
                  className="border rounded p-2"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Ticket Price"
                  value={newTicket.price}
                  onChange={handleTicketChange}
                  className="border rounded p-2"
                />
                <input
                  type="number"
                  name="total"
                  placeholder="Total Tickets"
                  value={newTicket.total}
                  onChange={handleTicketChange}
                  className="border rounded p-2"
                />
                <button
                  type="button"
                  onClick={addTicket}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Add Ticket
                </button>
              </div>
            </div>
          )}

          {eventData.ticketTypes.length > 0 && (
            <div className="mt-4">
              <h3 className="font-bold mb-2">Added Tickets</h3>
              {eventData.ticketTypes.map((ticket, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border p-2 rounded mb-2"
                >
                  <span>
                    {ticket.type} - ${ticket.price} (Total: {ticket.total})
                  </span>
                  <button
                    type="button"
                    onClick={() => removeTicket(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {editingEvent ? "Update Event" : "Create Event"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateEvent;
