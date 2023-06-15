import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState([]);
  const history = useHistory();

  // Dummy client data for demonstration
  const dummyClients = [
    { id: '001', name: 'Client A', website: 'www.clientA.com' },
    { id: '002', name: 'Client B', website: 'www.clientB.com' },
    { id: '003', name: 'Client C', website: 'www.clientC.com' },
    { id: '004', name: 'Client D', website: 'www.clientD.com' },
    { id: '005', name: 'Client E', website: 'www.clientE.com' },
    // Add more clients as needed
  ];

  useEffect(() => {
    // Simulating API call to fetch clients
    // Replace this with your actual API call to fetch clients
    setClients(dummyClients);
  }, []);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter clients based on partial matches
    const filteredClients = dummyClients.filter((client) => {
      const { id, name, website } = client;
      const lowerCaseQuery = query.toLowerCase();

      return (
        id.toLowerCase().includes(lowerCaseQuery) ||
        name.toLowerCase().includes(lowerCaseQuery) ||
        website.toLowerCase().includes(lowerCaseQuery)
      );
    });

    setClients(filteredClients);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setClients(dummyClients);
  };

  const handleAddClient = () => {
    // Save client details and perform necessary actions
    // For now, let's just navigate to the CreateClient page
    history.push('/create');
  };

  const handleClientClick = (clientId) => {
    // Redirect to client page using the client ID
    history.push(`/client/${clientId}`);
  };

  const handleWebsiteClick = (website) => {
    // Open website link in a new tab/window
    window.open(`https://${website}`, '_blank');
  };

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
        <button onClick={handleAddClient}>Add Client</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Client Name</th>
            <th>Website</th>
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
              <td>
                <a href={`https://${client.website}`} onClick={() => handleWebsiteClick(client.website)}>
                  {client.website}
                </a>
              </td>
            </tr>
          ))}
       

        </tbody >   
        </table>
      </div>
    );
};

export default Clients;
