import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Products from './pages/Product';
import Contact from './pages/Contact';
import Pets from './pages/Pets';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { useState,useEffect } from 'react';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch {
        // nếu bị lỗi parse thì bỏ qua
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate('/login');
  };
  return (
    <>
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pets" element={<Pets />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={setCurrentUser} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
