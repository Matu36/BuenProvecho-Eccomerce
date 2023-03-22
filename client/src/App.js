import './App.css';
import { Routes, Route } from "react-router-dom";

import NavBar from './components/NavBar';
import Home from './components/Home';

function App() {
  return (
    
    <Routes>
      <Route exact path={"/"} element={<Home />} />
    <Route exact path={"/"} element={<NavBar />} />
    
    </Routes>
  );
}

export default App;
