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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from '@mui/material';

const CandidateGroups = () => {
  const [candidateGroups, setCandidateGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [candidateOptions, setCandidateOptions] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchCandidateGroups = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/candidategroups');
        setCandidateGroups(response.data);
      } catch (error) {
        console.error('Error fetching candidate groups:', error);
      }
    };

    const fetchCandidateOptions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/candidates');
        setCandidateOptions(response.data);
      } catch (error) {
        console.error('Error fetching candidate options:', error);
      }
    };

    fetchCandidateGroups();
    fetchCandidateOptions();
  }, []);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleGroupSelection = (groupId) => {
    setSelectedGroups((prevSelectedGroups) => {
      if (prevSelectedGroups.includes(groupId)) {
        return prevSelectedGroups.filter((id) => id !== groupId);
      } else {
        return [...prevSelectedGroups, groupId];
      }
    });
  };

  const handleDeleteGroups = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete the selected groups?');
    if (!confirmDelete) {
      return;
    }

    try {
      // Delete the selected groups
      await Promise.all(
        selectedGroups.map(async (groupId) => {
          await axios.delete(`http://localhost:8000/api/candidategroups/${groupId}`);
        })
      );
      // Refresh the candidate groups list
      const response = await axios.get('http://localhost:8000/api/candidategroups');
      setCandidateGroups(response.data);
      // Clear selected groups
      setSelectedGroups([]);
      // Show success message
      setSnackbarMessage('Selected candidate groups deleted successfully.');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting candidate groups:', error);
      // Show error message
      setSnackbarMessage('Error deleting candidate groups. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleAddCandidateToGroup = () => {
    setOpenDialog(true);
  };

  const filteredCandidateGroups = candidateGroups.filter((group) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const groupName = group.name ? group.name.toLowerCase() : '';
    const groupDescription = group.description ? group.description.toLowerCase() : '';
  
    return groupName.includes(lowerCaseQuery) || groupDescription.includes(lowerCaseQuery);
  });
  

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCandidateSelection = (e) => {
    const candidateId = e.target.value;
    setSelectedCandidate(candidateId);
  };

  const handleAddCandidateToGroupSubmit = async () => {
    try {
      await axios.post('http://localhost:8000/api/candidategroups', {
        candidate_id: selectedCandidate,
        groups: selectedGroups,
      });

      // Clear selected groups
      setSelectedGroups([]);

      // Close dialog
      setOpenDialog(false);

      // Show success message
      setSnackbarMessage('Candidate added to selected groups successfully.');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error adding candidate to groups:', error);

      // Show error message
      setSnackbarMessage('Error adding candidate to groups. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <h2>Candidate Groups</h2>
      <div>
        <TextField label="Group Quick Search" value={searchQuery} onChange={handleSearchQueryChange} />
        <Button variant="outlined" onClick={handleClearSearch}>
          Clear
        </Button>
        <Button variant="contained" onClick={handleDeleteGroups} disabled={selectedGroups.length === 0}>
          Delete Selected
        </Button>
        <Button variant="contained" onClick={handleAddCandidateToGroup} disabled={selectedGroups.length === 0}>
          Add Candidate to Group
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Candidate ID</TableCell>
            <TableCell>Group ID</TableCell>
            <TableCell>Select</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCandidateGroups.map((group) => (
            <TableRow key={group.id}>
              <TableCell>{group.id}</TableCell>
              <TableCell>{group.candidate_id}</TableCell>
              <TableCell>{group.group_id}</TableCell>
              <TableCell>
                <Checkbox
                  checked={selectedGroups.includes(group.id)}
                  onChange={() => handleGroupSelection(group.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add Candidate to Selected Groups</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Select Candidate</InputLabel>
            <Select value={selectedCandidate} onChange={handleCandidateSelection}>
              {candidateOptions.map((candidate) => (
                <MenuItem key={candidate.candidate_id} value={candidate.candidate_id}>
                  {candidate.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddCandidateToGroupSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose} message={snackbarMessage} />
    </div>
  );
};

export default CandidateGroups;
