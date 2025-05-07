import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        const json = await res.json();
        setEvent(json.data);
      } catch (err) {
        console.error("Failed to fetch event:", err);
      }
    };    
    fetchEvent();
  }, [id]);

  const handleOrder = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${id}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ quantity })
      });
  
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || `Berhasil beli ${quantity} tiket`);
      } else {
        setMessage(data.message || "Gagal memesan tiket.");
      }
    } catch (err) {
      setMessage("Terjadi kesalahan saat memesan tiket.");
      console.error(err);
    }
  };
  

  const increment = () => setQuantity((q) => Math.min(q + 1, event?.stock || 1));
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1));

  if (!event) return <div className="page">Loading event...</div>;

  return (
    <div className="event-detail-container">
      <h2>{event.title}</h2>
      <p>{event.description || "No description available."}</p>
      <p><strong>📍 Location:</strong> {event.location || "-"}</p>
      <p><strong>📅 Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>🎟️ Stock tersedia:</strong> {event.stock}</p>

      <div className="ticket-quantity">
        <button onClick={decrement}>−</button>
        <span>{quantity}</span>
        <button onClick={increment}>+</button>
      </div>

      <button className="order-btn" onClick={handleOrder}>Pesan Tiket</button>
      {message && <p className="success-text">{message}</p>}
    </div>
  );
};

export default EventDetail;
