import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Radio,
  Snackbar,
} from '@mui/material';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState([]); // Updated state for multiple group selection
  const [openDialog, setOpenDialog] = useState(false);
  const [groupOptions, setGroupOptions] = useState([]);
  const [showAddButton, setShowAddButton] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/candidates');
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    const fetchGroupOptions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/groups');
        setGroupOptions(response.data);
      } catch (error) {
        console.error('Error fetching group options:', error);
      }
    };

    fetchCandidates();
    fetchGroupOptions();
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

  const handleGroupSelection = (groupId) => {
    const updatedSelectedGroupIds = selectedGroupIds.includes(groupId)
      ? selectedGroupIds.filter((id) => id !== groupId)
      : [...selectedGroupIds, groupId];
  
    setSelectedGroupIds(updatedSelectedGroupIds);
    setShowAddButton(updatedSelectedGroupIds.length > 0);
  };

  const handleDeleteCandidates = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete the selected candidates?');
    if (!confirmDelete) {
      return;
    }

    try {
      await Promise.all(
        selectedCandidates.map(async (candidateId) => {
          await axios.delete(`http://localhost:8000/api/candidates/${candidateId}`);
        })
      );

      const response = await axios.get('http://localhost:8000/api/candidates');
      setCandidates(response.data);
      setSelectedCandidates([]);
      setSnackbarMessage('Selected candidates deleted successfully.');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting candidates:', error);
      setSnackbarMessage('Error deleting candidates. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleAddToGroup = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedGroupIds([]);
  };

  const handleAddToGroupSubmit = async () => {
    try {
      const payload = {
        candidate_ids: selectedCandidates,
        group_ids: selectedGroupIds, // Updated payload with selected group IDs
      };

      await axios.post('http://localhost:8000/api/candidategroups', payload);

      setSelectedCandidates([]);
      setSelectedGroupIds([]);
      setOpenDialog(false);
      setSnackbarMessage('Selected candidates added to the groups successfully.');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error adding candidates to the groups:', error);
      setSnackbarMessage('Error adding candidates to the groups. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const fieldsToSearch = [
      'first_name',
      'last_name',
      'address',
      'phone',
      'email',
      'notes',
      'type',
      'specialization',
      'skills',
    ];

    return fieldsToSearch.some((field) => {
      const fieldValue = candidate[field] || '';
      return fieldValue.toLowerCase().includes(lowerCaseQuery);
    });
  });

  return (
    <div>
      <h2>Candidates</h2>
      <div>
        <TextField label="Candidate Quick Search" value={searchQuery} onChange={handleSearchQueryChange} />
        <Button variant="outlined" onClick={handleClearSearch}>
          Clear
        </Button>
        <Button variant="contained" onClick={handleDeleteCandidates} disabled={selectedCandidates.length === 0}>
          Delete Selected
        </Button>
        {selectedCandidates.length > 0 && (
          <Button variant="contained" onClick={handleAddToGroup}>
            Add to Group
          </Button>
        )}
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
            <TableCell>Specialization</TableCell>
            <TableCell>Skills</TableCell>
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
              <TableCell>{candidate.specialization || ''}</TableCell>
              <TableCell>{candidate.skills || ''}</TableCell>
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
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add Selected Candidates to Group</DialogTitle>
        <DialogContent>
          {groupOptions.map((group) => (
            <FormControlLabel
              key={group.group_id}
              control={
                <Checkbox
                  checked={selectedGroupIds.includes(group.group_id)}
                  onChange={() => handleGroupSelection(group.group_id)}
                />
              }
              label={group.name}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddToGroupSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose} message={snackbarMessage} />
    </div>
  );
};

export default Candidates;



