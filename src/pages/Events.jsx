import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  
  const filteredEvents = Array.isArray(events)
  ? events.filter(event => event && event.title?.toLowerCase().includes(searchTerm.toLowerCase()))
  : [];


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus event ini?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        setEvents(prev => prev.filter((e) => e.id !== id));
        alert("Event berhasil dihapus.");
      } else {
        alert("Gagal menghapus event.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    }
  };

  const handleEdit = async (event) => {
    const newTitle = prompt("Edit judul event:", event.title);
    if (!newTitle) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...event, title: newTitle }),
      });

    
      console.log("Response status:", res.status);
      // console.log("Response body:", await res.json());
      console.log("Response headers:", res.headers.get("Content-Type"));
      console.log("Response URL:", res.url);
      console.log("Response status text:", res.statusText);

    //  /\ const response = await res.json();

    if (!res.ok) {
      alert("Gagal update event.");
      return;
    }

    const updatedRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${event.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const updatedData = await updatedRes.json();

    setEvents(prev =>
      prev.map(e => e.id === event.id ? updatedData.data : e)
    );

    setActiveDropdown(null);
    alert("Event berhasil diupdate.");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.", err);
    }
  };

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
        console.error("Gagal mengambil data events:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      <div className="events-header">
        <h2 style={{display: "flex", justifyContent: "left"}}>Upcoming Events</h2>
        <Link to="/events/create" className="btn-create">+ Create Event</Link></div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Cari event..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="events-grid">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))} 
        
        {filteredEvents.length === 0 && <h2>Tidak ada event</h2>}
      </div>
    </div>
  );
};

export default Events;
