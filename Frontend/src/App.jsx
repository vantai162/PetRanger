import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Products from './pages/Product';
import Contact from './pages/Contact';
import Pets from './pages/Pets';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pets" element={<Pets />} />
      </Routes>
    </>
  );
}

export default App;
