import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css';

function App() {
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshContacts = () => {
        setRefreshKey(oldKey => oldKey + 1);
    };

    return (
        <div>
            <h1>Contact Manager</h1>
            <div className="container">
                <ContactForm onAdd={refreshContacts} />
                <ContactList key={refreshKey} />
            </div>
        </div>
    );
}

export default App;
