import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Clients = () => {
  const history = useHistory();
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample array of clients (replace with your actual API calls)
  const dummyClients = [
    {
      id: 1,
      name: 'Client 1',
      address: '123 Main St, New York',
      website: 'www.client1.com',
      notes: 'Lorem ipsum dolor sit amet'
    },
    {
      id: 2,
      name: 'Client 2',
      address: '456 Elm St, San Francisco',
      website: 'www.client2.com',
      notes: 'Lorem ipsum dolor sit amet'
    },
    {
      id: 3,
      name: 'Client 3',
      address: '789 Oak St, London',
      website: 'www.client3.com',
      notes: 'Lorem ipsum dolor sit amet'
    }
  ];

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Replace with your actual API call to fetch clients
        // const response = await fetch('/api/clients');
        // const data = await response.json();
        // setClients(data);
        setClients(dummyClients);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter clients based on partial matches
    const filteredClients = dummyClients.filter((client) => {
      const { name, address, website } = client;
      const lowerCaseQuery = query.toLowerCase();

      return (
        name.toLowerCase().includes(lowerCaseQuery) ||
        address.toLowerCase().includes(lowerCaseQuery) ||
        website.toLowerCase().includes(lowerCaseQuery)
      );
    });

    setClients(filteredClients);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    // Reset clients to the original list
    setClients(dummyClients);
  };

  const handleAddClient = () => {
    // Save client details and perform necessary actions
    // For now, let's just navigate to the CreateClient page
    history.push('/createclient');
  };

  const handleClientClick = (clientId) => {
    // Redirect to client page using the client ID
    history.push(`/client/${clientId}`);
  };

  return (
    <div>
      <h2>Clients!</h2>
      <div>
        <label htmlFor="searchQuery">Search Client:</label>
        <input
          type="text"
          id="searchQuery"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button onClick={handleClearSearch}>Clear</button>
        <button onClick={handleAddClient}>Add Client</button>
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
          {clients.map((client) => (
            <tr key={client.id}>
              <td>
                <a href={`/client/${client.id}`} onClick={() => handleClientClick(client.id)}>
                  {client.id}
                </a>
              </td>
              <td>
                <a href={`/client/${client.id}`} onClick={() => handleClientClick(client.id)}>
                  {client.name}
                </a>
              </td>
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

