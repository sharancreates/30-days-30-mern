import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import QuoteCard from './components/QuoteCard';
import Favorites from './components/Favourites';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">My Favorites</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <h1>Random Quote Generator</h1>
              <QuoteCard />
            </>
          } />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;