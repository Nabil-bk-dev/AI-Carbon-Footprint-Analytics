import { Routes, Route } from 'react-router-dom';
import Home from '../src/components/Home';
import Dashboard from '../src/components/Dashboard';

function App() {

  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>

  );
}

export default App;