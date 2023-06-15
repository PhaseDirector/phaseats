import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateClient = () => {
  const [clients, setClients] = useState([]);
  const [clientDetails, setClientDetails] = useState({
    id: '',
    name: '',
    address: '',
    website: '',
    notes: '',
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddClient = () => {
    if (clientDetails.name && clientDetails.address && clientDetails.website) {
      const newClient = {
        ...clientDetails,
        id: generateClientId(),
      };
      setClients((prevClients) => [...prevClients, newClient]);
      setClientDetails({
        id: '',
        name: '',
        address: '',
        website: '',
        notes: '',
      });
      history.push('/clients'); // Redirect to the Clients component
    }
  };

  // Generate a 4-digit client ID automatically
  function generateClientId() {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `C${randomNumber}`;
  }

  return (
    <div>
      <h2>Create Client</h2>
      <label htmlFor="clientName">Client Name:</label>
      <input
        type="text"
        id="clientName"
        name="name"
        value={clientDetails.name}
        onChange={handleChange}
      />
      <label htmlFor="clientAddress">Address:</label>
      <input
        type="text"
        id="clientAddress"
        name="address"
        value={clientDetails.address}
        onChange={handleChange}
      />
      <label htmlFor="clientWebsite">Website:</label>
      <input
        type="text"
        id="clientWebsite"
        name="website"
        value={clientDetails.website}
        onChange={handleChange}
      />
      <label htmlFor="clientNotes">Notes:</label>
      <textarea
        id="clientNotes"
        name="notes"
        value={clientDetails.notes}
        onChange={handleChange}
      ></textarea>
      <button onClick={handleAddClient}>Add Client</button>
    </div>
  );
};

export default CreateClient;

