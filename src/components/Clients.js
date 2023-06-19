import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const filteredClients = clients.filter((client) => {
    const { client_name, address, website, notes } = client;
    const lowerCaseQuery = searchQuery.toLowerCase();

    return (
      client_name.toLowerCase().includes(lowerCaseQuery) ||
      address.toLowerCase().includes(lowerCaseQuery) ||
      website.toLowerCase().includes(lowerCaseQuery) ||
      notes.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div>
      <h2>Clients</h2>
      <div>
        <label htmlFor="searchQuery">Search Client:</label>
        <input
          type="text"
          id="searchQuery"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button onClick={handleClearSearch}>Clear</button>
        <Link to="/createclient">Add Client</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Website</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.client_id}>
              <td>
                <Link to={`/client/${client.client_id}`}>{client.client_id}</Link>
              </td>
              <td>{client.client_name}</td>
              <td>{client.address}</td>
              <td>{client.website}</td>
              <td>{client.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;

