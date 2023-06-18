import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Candidates = () => {
  const history = useHistory();
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample array of candidates (replace with your actual API calls)
  const dummyCandidates = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      phone: '1234567890',
      email: 'john@example.com',
      notes: 'Lorem ipsum dolor sit amet',
      type: 'Project Manager'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      address: '456 Elm St',
      phone: '9876543210',
      email: 'jane@example.com',
      notes: 'Lorem ipsum dolor sit amet',
      type: 'Developer'
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Johnson',
      address: '789 Oak St',
      phone: '5678901234',
      email: 'bob@example.com',
      notes: 'Lorem ipsum dolor sit amet',
      type: 'Business Analyst'
    }
  ];

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Replace with your actual API call to fetch candidates
        // const response = await fetch('/api/candidates');
        // const data = await response.json();
        // setCandidates(data);
        setCandidates(dummyCandidates);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter candidates based on partial matches
    const filteredCandidates = dummyCandidates.filter((candidate) => {
      const { firstName, lastName, email, phone } = candidate;
      const lowerCaseQuery = query.toLowerCase();

      return (
        firstName.toLowerCase().includes(lowerCaseQuery) ||
        lastName.toLowerCase().includes(lowerCaseQuery) ||
        email.toLowerCase().includes(lowerCaseQuery) ||
        phone.toLowerCase().includes(lowerCaseQuery)
      );
    });

    setCandidates(filteredCandidates);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    // Reset candidates to the original list
    setCandidates(dummyCandidates);
  };

  const handleAddCandidate = () => {
    // Save candidate details and perform necessary actions
    // For now, let's just navigate to the CreateCandidate page
    history.push('/createcandidate');
  };

  const handleCandidateClick = (candidateId) => {
    // Redirect to candidate page using the candidate ID
    history.push(`/candidate/${candidateId}`);
  };

  return (
    <div>
      <h2>Candidates!</h2>
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
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Notes</th>
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
              <td>{candidate.address}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.email}</td>
              <td>{candidate.notes}</td>
              <td>{candidate.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Candidates;






