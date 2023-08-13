

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

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [candidateOptions, setCandidateOptions] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    const fetchCandidateOptions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/candidates');
        setCandidateOptions(response.data);
        setFilteredCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidate options:', error);
      }
    };

    fetchGroups();
    fetchCandidateOptions();
  }, []);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    filterCandidates(event.target.value);
  };

  const filterCandidates = (query) => {
    const filtered = candidateOptions.filter((candidate) => {
      const candidateValues = Object.values(candidate).join('').toLowerCase();
      return candidateValues.includes(query.toLowerCase());
    });
    setFilteredCandidates(filtered);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredCandidates(candidateOptions);
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
      await axios.delete('http://localhost:8000/api/groups', { data: { groupIds: selectedGroups } });

      setGroups((prevGroups) => prevGroups.filter((group) => !selectedGroups.includes(group.id)));
      setSelectedGroups([]);
      setSnackbarMessage('Selected groups deleted successfully.');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting groups:', error);
      setSnackbarMessage('Error deleting groups. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleAddCandidateToGroup = () => {
    if (selectedGroups.length > 0) {
      setOpenDialog(true);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedCandidate('');
    setFilteredCandidates(candidateOptions);
    setSearchQuery('');
  };

  const handleCandidateSelection = (event) => {
    setSelectedCandidate(event.target.value);
  };

  const handleAddCandidateToGroupSubmit = async () => {
    try {
      await axios.post('http://localhost:8000/api/candidategroups', {
        candidateId: selectedCandidate,
        groupIds: selectedGroups,
      });

      setSelectedGroups([]);
      setOpenDialog(false);
      setSnackbarMessage('Candidate added to selected groups successfully.');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error adding candidate to groups:', error);
      setSnackbarMessage('Error adding candidate to groups. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const filteredGroups = groups.filter((group) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      group.name.toLowerCase().includes(lowerCaseQuery) ||
      (group.description && group.description.toLowerCase().includes(lowerCaseQuery))
    );
  });

  return (
    <div>
      <h2>Groups</h2>
      <div>
        <TextField
          label="Group Quick Search"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <Button variant="outlined" onClick={handleClearSearch}>
          Clear
        </Button>
        <Button
          variant="contained"
          onClick={handleDeleteGroups}
          disabled={selectedGroups.length === 0}
        >
          Delete Selected
        </Button>
        <Button
          variant="contained"
          onClick={handleAddCandidateToGroup}
          disabled={selectedGroups.length === 0}
        >
          Add Candidate to Group
        </Button>
        <Link to="/creategroup">Add Group</Link>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Group ID</TableCell>
            <TableCell>Group Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Select</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {filteredGroups.map((group) => (
            <TableRow key={group.group_id}>
              <TableCell>
                <Link to={`/groups/${group.group_id}`}>
                  {group.group_id}</Link>
              </TableCell>
              <TableCell>{group.name}</TableCell>
              <TableCell>{group.description}</TableCell>
              <TableCell>
                <Checkbox
                  checked={selectedGroups.includes(group.group_id)}
                  onChange={() => handleGroupSelection(group.group_id)}
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
              {filteredCandidates.map((candidate) => (
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Groups;
