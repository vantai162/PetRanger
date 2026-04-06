import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
