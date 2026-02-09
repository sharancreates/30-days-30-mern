import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch notes with optional date filtering
  const fetchNotes = async () => {
    try {
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const res = await axios.get('/api/notes', { params });
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  // Fetch immediately on load and whenever dates change
  useEffect(() => {
    fetchNotes();
  }, [startDate, endDate]);

  const addNote = (newNote) => {
    // Add the new note to the top of the list
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  return (
    <div className="container">
      <h1>📅 Timestamped Notes (Vite)</h1>
      
      <div className="section">
        <NoteForm onAdd={addNote} />
      </div>

      <div className="section filter-section">
        <h3>Filter by Date</h3>
        <div className="date-inputs">
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
          <span> to </span>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
          <button 
            className="clear-btn"
            onClick={() => { setStartDate(''); setEndDate(''); }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <NoteList notes={notes} />
    </div>
  );
}

export default App;