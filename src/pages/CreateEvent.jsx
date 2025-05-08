import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateEvent.css";

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    stock: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...form,
          stock: parseInt(form.stock, 10) || 0,
        }),
      });

      if (res.ok) {
        alert("Event berhasil dibuat!");
        navigate("/events");
      } else {
        alert("Gagal membuat event.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat membuat event.");
    }
  };

  return (
    <div className="create-event-container">
      <h2>Buat Event Baru</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          name="title"
          placeholder="Judul Event"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Deskripsi"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Lokasi"
          value={form.location}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Jumlah Stok"
          value={form.stock}
          onChange={handleChange}
          required
          min="1"
        />
        <button type="submit">Simpan Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
