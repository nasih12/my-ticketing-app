import { useEffect, useState } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events?page=1&size=10`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const json = await res.json();
        setEvents(json.data || []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      <h2>Upcoming Events</h2>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description || "No description provided."}</p>
            <p><strong>📍 Location:</strong> {event.location || "-"}</p>
            <p><strong>📅 Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>🎟️ Stock:</strong> {event.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
