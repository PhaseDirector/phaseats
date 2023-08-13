//starting new code 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientDetails = (props) => {
  const [client, setClient] = useState(null);
  const [editedClient, setEditedClient] = useState(null);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const ClientId = props.match.params.id; // Extract the client ID from the URL
        const response = await axios.get(`http://localhost:8000/api/clients/${ClientId}`);
        setClient(response.data);
        setEditedClient(response.data);
      } catch (error) {
        console.error('Error fetching Client details:', error);
      }
    };

    console.log('Client ID:', props.match.params.id); // Add this console.log statement

    fetchClientDetails();
  }, [props.match.params.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedClient((prevEditedClient) => ({
      ...prevEditedClient,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:8000/api/clients/${client.client_id}`, editedClient);
      setClient(editedClient);
      alert('Changes saved successfully!');
      setTimeout(() => {
        window.location.href = '/clients'; // Redirect to the clients page
      }, 100); // Delay the redirect by a small amount to ensure state update is complete
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  if (!client || !editedClient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Client Details</h2>
      <table>
        <tbody>
          <tr>
            <th>Client ID</th>
            <td>{client.client_id}</td>
          </tr>
          <tr>
            <th>Client Name</th>
            <td>
              <input
                type="text"
                name="client_name"
                value={editedClient.client_name || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Address</th>
            <td>
              <input
                type="text"
                name="address"
                value={editedClient.address || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Website</th>
            <td>
              <input
                type="text"
                name="website"
                value={editedClient.website || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Notes</th>
            <td>
              <input
                type="text"
                name="notes"
                value={editedClient.notes || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
                    
          
          
        </tbody>
      </table>
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default ClientDetails;
