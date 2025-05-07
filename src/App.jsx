import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Events from './pages/Events';
import MyTicket from './pages/MyTicket';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import EventDetail from './pages/EventDetail';
import MyTickets from './pages/MyTicket';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegistPage = location.pathname === "/register";

  return (
    <>
      {!isLoginPage && !isRegistPage && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/events" element={<PrivateRoute><Events /></PrivateRoute>} />
        <Route path="/myticket" element={<PrivateRoute><MyTicket /></PrivateRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<PrivateRoute><Events /></PrivateRoute>} />
        <Route path="/events/:id" element={<PrivateRoute><EventDetail /></PrivateRoute>} />
        <Route path="/mytickets" element={<PrivateRoute><MyTickets /></PrivateRoute>} />

      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
