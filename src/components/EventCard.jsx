import { useState } from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event, onEdit, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  
  const handleClickEdit = () => {
    setShowDropdown(false);
    onEdit(event);
  };

  const handleClickOutside = (e) => {
    if (showDropdown && !e.target.closest('.dropdown')) {
      setShowDropdown(false);
    }
  };
  document.addEventListener('click', handleClickOutside);

  return (
    <div className="event-card">
      <div className="card-header">
        <h3>{event.title}</h3>
        <div className="dropdown">
          <button className="menu-button" onClick={toggleDropdown}>⋮</button>
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={() => handleClickEdit()}>Edit</button>
              <button onClick={() => onDelete(event.id)}>Delete</button>
            </div>
          )}
        </div>
      </div>
      <p>{event.description || "No description provided."}</p>
      <p><strong>📍 Location:</strong> {event.location || "-"}</p>
      <p><strong>📅 Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>🎟️ Stock:</strong> {event.stock}</p>

      <Link to={`/events/${event.id}`}>
        <button className="book-btn">Booking Now</button>
      </Link>
    </div>
  );
};

export default EventCard;
