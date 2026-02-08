import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log("Attempting to submit:", formData);

        try {
            const res = await axios.post('/api/contacts', formData);
            console.log("Success:", res.data);

            onAdd(); // refresh
            setFormData({ name: '', email: '', phone: '', type: 'personal' }); // clear form
        } catch (err) {
            console.error("Submission Error:", err);

            if (err.response) {
                const errorData = err.response.data;

                if (errorData.errors) {
                    const msg = errorData.errors.map(e => e.msg).join('\n');
                    alert("Validation Failed:\n" + msg);
                } else {
                    alert("Server Error: " + JSON.stringify(errorData));
                }
            } else if (err.request) {
                alert("Network Error: Server is likely offline or not reachable on port 5000.");
            } else {
                alert("Error: " + err.message);
            }
        }
    };

    return (
        <div className="form-card">
            <h3>Add New Contact</h3>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={phone}
                    onChange={onChange}
                />

                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="personal"
                            checked={type === 'personal'}
                            onChange={onChange}
                        />
                        Personal
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="professional"
                            checked={type === 'professional'}
                            onChange={onChange}
                        />
                        Professional
                    </label>
                </div>

                <button type="submit">Add Contact</button>
            </form>
        </div>
    );
};

export default ContactForm;
