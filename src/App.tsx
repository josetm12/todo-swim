import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home/Home.tsx';
import Login from '@/pages/Login/Login';
import Signup from '@/pages/Signup/Signup';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
