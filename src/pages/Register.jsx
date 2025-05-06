import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirm(!showConfirm);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi tidak cocok.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) throw new Error("Gagal registrasi");

      const data = await res.json();
      setSuccessMsg(`User "${data.user.username}" berhasil terdaftar!`);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setError("Registrasi gagal. Username mungkin sudah digunakan.");
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleRegister} className="login-card">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* <button
            type="button"
            className="toggle-password"
            onClick={toggleShowPassword}
          >
            <span className="material-icons">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button> */}
        </div>

        <div className="password-wrapper">
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {/* <button
          type="button"
          className="toggle-password"
          onClick={toggleShowConfirmPassword}
        >
          <span className="material-icons">
            {showConfirm ? "visibility_off" : "visibility"}
          </span>
        </button> */}
        </div>
       
        <button type="submit">Register</button>
        {error && <p className="error-text">{error}</p>}
        {successMsg && <p className="success-text">{successMsg}</p>}

        <p className="register-text">
          Sudah punya akun? <Link to="/login">Login di sini</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
