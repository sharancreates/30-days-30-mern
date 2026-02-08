import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await axios.get('/api/contacts');
                setContacts(res.data);
            } catch (err) {
                console.error("Error fetching contacts");
            }
        };

        fetchContacts();
    }, []); // runs once on mount

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this case file?")) {
            try {
                await axios.delete(`/api/contacts/${id}`);
                // remove from UI immediately without refreshing
                setContacts(contacts.filter(contact => contact._id !== id));
            } catch (err) {
                alert("Error deleting contact");
            }
        }
    };

    return (
        <div className="list-card">
            <h3>Case Files</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Type</th>
                        <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.length > 0 ? (
                        contacts.map(contact => (
                            <tr key={contact._id}>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone || "N/A"}</td>
                                <td>
                                    <span className={`badge ${contact.type}`}>
                                        {contact.type}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <button
                                        onClick={() => handleDelete(contact._id)}
                                        className="btn-delete"
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="5"
                                style={{ textAlign: 'center', padding: '20px' }}
                            >
                                No records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ContactList;
