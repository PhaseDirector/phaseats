import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [candidates, setCandidates] = useState([]);
  const history = useHistory();

  // Dummy candidate data for demonstration
  const dummyCandidates = [
    { id: '001', firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '1234567890', type: 'Project Manager' },
    { id: '002', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phone: '9876543210', type: 'Developer' },
    // Add more candidates as needed
  ];

  useEffect(() => {
    // Simulating API call to fetch candidates
    // Replace this with your actual API call to fetch candidates
    setCandidates(dummyCandidates);
  }, []);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter candidates based on partial matches
    const filteredCandidates = dummyCandidates.filter((candidate) => {
      const { firstName, lastName, email, phone, type } = candidate;
      const lowerCaseQuery = query.toLowerCase();

      return (
        firstName.toLowerCase().includes(lowerCaseQuery) ||
        lastName.toLowerCase().includes(lowerCaseQuery) ||
        email.toLowerCase().includes(lowerCaseQuery) ||
        phone.toLowerCase().includes(lowerCaseQuery) ||
        type.toLowerCase().includes(lowerCaseQuery)
      );
    });

    setCandidates(filteredCandidates);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCandidates(dummyCandidates);
  };

  const handleAddCandidate = () => {
    // Save candidate details and perform necessary actions
    // For now, let's just navigate to the CreateCandidate page
    history.push('/createcan');
  };

  const handleCandidateClick = (candidateId) => {
    // Redirect to candidate page using the candidate ID
    history.push(`/candidate/${candidateId}`);
  };

  return (
    <div>
      <h2>Candidates</h2>
      <div>
        <label htmlFor="searchQuery">Search Candidate:</label>
        <input
          type="text"
          id="searchQuery"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button onClick={handleClearSearch}>Clear</button>
        <button onClick={handleAddCandidate}>Add Candidate</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Candidate ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>
                <a href={`/candidate/${candidate.id}`} onClick={() => handleCandidateClick(candidate.id)}>
                  {candidate.id}
                </a>
              </td>
              <td>
                <a href={`/candidate/${candidate.id}`} onClick={() => handleCandidateClick(candidate.id)}>
                  {candidate.firstName}
                </a>
              </td>
              <td>{candidate.lastName}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.type}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Candidates;



