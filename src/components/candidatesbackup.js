import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#51ff00', // Replace with your desired primary color
    },
    secondary: {
      main: '#00ff00', // Replace with your desired secondary color
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif, italic', // Replace with your desired font
  },
});

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/candidates');
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleCandidateSelection = (candidateId) => {
    setSelectedCandidates((prevSelectedCandidates) => {
      if (prevSelectedCandidates.includes(candidateId)) {
        return prevSelectedCandidates.filter((id) => id !== candidateId);
      } else {
        return [...prevSelectedCandidates, candidateId];
      }
    });
  };

  const handleDeleteCandidates = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete the selected candidates?');
    if (!confirmDelete) {
      return;
    }

    try {
      // Delete the selected candidates
      await Promise.all(
        selectedCandidates.map(async (candidateId) => {
          await axios.delete(`http://localhost:8000/api/candidates/${candidateId}`);
        })
      );
      // Refresh the candidate list
      const response = await axios.get('http://localhost:8000/api/candidates');
      setCandidates(response.data);
      // Clear selected candidates
      setSelectedCandidates([]);
    } catch (error) {
      console.error('Error deleting candidates:', error);
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const { first_name, last_name, address, phone, email, notes, type } = candidate;
    const lowerCaseQuery = searchQuery.toLowerCase();

    return (
      first_name.toLowerCase().includes(lowerCaseQuery) ||
      last_name.toLowerCase().includes(lowerCaseQuery) ||
      address.toLowerCase().includes(lowerCaseQuery) ||
      phone.toLowerCase().includes(lowerCaseQuery) ||
      email.toLowerCase().includes(lowerCaseQuery) ||
      notes.toLowerCase().includes(lowerCaseQuery) ||
      type.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div>
      <h2>Candidates</h2>
      <div>
        <TextField
          label="Search Test Candidates"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <Button variant="outlined" onClick={handleClearSearch}>Clear</Button>
        <Button
          variant="contained"
          onClick={handleDeleteCandidates}
          disabled={selectedCandidates.length === 0}
        >
          Delete Selected
        </Button>
        <Link to="/createcandidate">Add Candidate</Link>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Candidate ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Select</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCandidates.map((candidate) => (
            <TableRow key={candidate.candidate_id}>
              <TableCell>
                <Link to={`/candidates/${candidate.candidate_id}`}>{candidate.candidate_id}</Link>
              </TableCell>
              <TableCell>{candidate.first_name}</TableCell>
              <TableCell>{candidate.last_name}</TableCell>
              <TableCell>{candidate.address}</TableCell>
              <TableCell>{candidate.phone}</TableCell>
              <TableCell>{candidate.email}</TableCell>
              <TableCell>{candidate.notes}</TableCell>
              <TableCell>{candidate.type}</TableCell>
              <TableCell>
                <Checkbox
                  checked={selectedCandidates.includes(candidate.candidate_id)}
                  onChange={() => handleCandidateSelection(candidate.candidate_id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Candidates;