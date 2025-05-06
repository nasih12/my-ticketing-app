import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <h3>🎫 Okarin's Ticket Hub</h3>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/mytickets">My Tickets</Link>
        {isAuthenticated && <button onClick={logout} style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          cursor: 'pointer'
        }}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
