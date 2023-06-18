import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Candidates = () => {
  const history = useHistory();
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [originalCandidates, setOriginalCandidates] = useState([]);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/candidates');
      setCandidates(response.data);
      setOriginalCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredCandidates = originalCandidates.filter((candidate) => {
      const { first_name, last_name, email, phone } = candidate;
      const lowerCaseQuery = query.toLowerCase();

      return (
        first_name.toLowerCase().includes(lowerCaseQuery) ||
        last_name.toLowerCase().includes(lowerCaseQuery) ||
        email.toLowerCase().includes(lowerCaseQuery) ||
        phone.toLowerCase().includes(lowerCaseQuery)
      );
    });

    setCandidates(filteredCandidates);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCandidates(originalCandidates);
  };

  const handleAddCandidate = () => {
    history.push('/createcandidate');
  };

  const handleCandidateClick = (candidateId) => {
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
                  {candidate.first_name}
                </a>
              </td>
              <td>{candidate.last_name}</td>
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
