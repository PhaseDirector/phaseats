import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateClient = () => {
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [notes, setNotes] = useState('');

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newClient = {
      client_name: clientName,
      address,
      website,
      notes,
    };

    try {
      await axios.post('http://localhost:8000/api/clients', newClient);
      console.log('Client created successfully');
      // Reset the form fields
      setClientName('');
      setAddress('');
      setWebsite('');
      setNotes('');
      // Redirect to Clients component
      history.push('/clients');
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  return (
    <div>
      <h2>Create Client</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="clientName">Client Name:</label>
          <input
            type="text"
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateClient;
