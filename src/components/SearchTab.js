import React, { useState, useEffect } from 'react';

const SearchTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [clients, setClients] = useState([]);

  // Dummy data for demonstration
  const dummyCandidates = [
    { id: '001', name: 'Candidate A', skills: 'Skill A' },
    { id: '002', name: 'Candidate B', skills: 'Skill B' },
    { id: '003', name: 'Candidate C', skills: 'Skill C' },
    { id: '004', name: 'Candidate D', skills: 'Skill D' },
    { id: '005', name: 'Candidate E', skills: 'Skill E' },
    // Add more candidates as needed
  ];

  const dummyJobs = [
    { id: '001', title: 'Job A', description: 'Description for Job A' },
    { id: '002', title: 'Job B', description: 'Description for Job B' },
    { id: '003', title: 'Job C', description: 'Description for Job C' },
    { id: '004', title: 'Job D', description: 'Description for Job D' },
    { id: '005', title: 'Job E', description: 'Description for Job E' },
    // Add more jobs as needed
  ];

  const dummyClients = [
    { id: '001', name: 'Client A', website: 'www.clientA.com' },
    { id: '002', name: 'Client B', website: 'www.clientB.com' },
    { id: '003', name: 'Client C', website: 'www.clientC.com' },
    { id: '004', name: 'Client D', website: 'www.clientD.com' },
    { id: '005', name: 'Client E', website: 'www.clientE.com' },
    // Add more clients as needed
  ];

  useEffect(() => {
    // Simulating API calls to fetch data
    // Replace these with your actual API calls to fetch data
    setCandidates(dummyCandidates);
    setJobs(dummyJobs);
    setClients(dummyClients);
  }, []);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const filterCandidates = () => {
    return dummyCandidates.filter((candidate) => {
      const { id, name, skills } = candidate;
      const lowerCaseQuery = searchQuery.toLowerCase();

      return (
        id.toLowerCase().includes(lowerCaseQuery) ||
        name.toLowerCase().includes(lowerCaseQuery) ||
        skills.toLowerCase().includes(lowerCaseQuery)
      );
    });
  };

  const filterJobs = () => {
    return dummyJobs.filter((job) => {
      const { id, title, description } = job;
      const lowerCaseQuery = searchQuery.toLowerCase();

      return (
        id.toLowerCase().includes(lowerCaseQuery) ||
        title.toLowerCase().includes(lowerCaseQuery) ||
        description.toLowerCase().includes(lowerCaseQuery)
      );
    });
  };

  const filterClients = () => {
    return dummyClients.filter((client) => {
      const { id, name, website } = client; // Add the assignment operator "=" here
      const lowerCaseQuery = searchQuery.toLowerCase();
  
      return (
        id.toLowerCase().includes(lowerCaseQuery) ||
        name.toLowerCase().includes(lowerCaseQuery) ||
        website.toLowerCase().includes(lowerCaseQuery)
      );
    });
  };

  const filteredCandidates = filterCandidates();
  const filteredJobs = filterJobs();
  const filteredClients = filterClients();

  return (
    <div>
      <h2>Search</h2>
      <div>
        <label htmlFor="searchQuery">Search:</label>
        <input
          type="text"
          id="searchQuery"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button onClick={handleClearSearch}>Clear</button>
      </div>

      <h3>Candidates</h3>
      <table>
        <thead>
          <tr>
            <th>Candidate ID</th>
            <th>Name</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>
                <a href={`/candidate/${candidate.id}`}>
                  {candidate.id}
                </a>
              </td>
              <td>
                <a href={`/candidate/${candidate.id}`}>
                  {candidate.name}
                </a>
              </td>
              <td>
                <a href={`/candidates/${candidate.skills}`}>
                  {candidate.skills}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Jobs</h3>
      <table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job) => (
            <tr key={job.id}>
              <td>
                <a href={`/job/${job.id}`}>
                  {job.id}
                </a>
              </td>
              <td>
                <a href={`/job/${job.id}`}>
                  {job.title}
                </a>
              </td>
              <td>
                <a href={`/job/${job.id}`}>
                  {job.description}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Clients</h3>
      <table>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Client Name</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.id}>
              <td>
                <a href={`/client/${client.id}`}>
                  {client.id}
                </a>
              </td>
              <td>
                <a href={`/client/${client.id}`}>
                  {client.name}
                </a>
              </td>
              <td>
                <a href={`https://${client.website}`} target="_blank" rel="noopener noreferrer">
                  {client.website}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchTab;
