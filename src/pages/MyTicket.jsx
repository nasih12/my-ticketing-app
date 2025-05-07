import { useEffect, useState } from "react";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/my-tickets`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const json = await res.json();
        setTickets(json.data || []);
      } catch (err) {
        console.error("Gagal mengambil tiket:", err);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="tickets-container">
      <h2>Tiket Saya</h2>
      {tickets.length === 0 ? (
        <p>Belum ada tiket yang dipesan.</p>
      ) : (
        <ul className="ticket-list">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="ticket-item">
              <div className="ticket-icon">🎟️</div>
              <div className="ticket-info">
                <h4>{ticket.Event.title}</h4>
                <p><strong>Lokasi:</strong> {ticket.Event.location || "-"}</p>
                <p><strong>Tanggal:</strong> {new Date(ticket.Event.date).toLocaleDateString()}</p>
                <p><strong>Jumlah:</strong> {ticket.quantity}</p>
                <p><small>Dipesan: {new Date(ticket.createdAt).toLocaleString()}</small></p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
};

export default MyTickets;
