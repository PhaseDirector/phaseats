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
  Snackbar,
  Alert,
} from '@mui/material';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [groupOptions, setGroupOptions] = useState([]);
  const [showAddButton, setShowAddButton] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
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

  useEffect(() => {
    setShowAddButton(selectedCandidates.length > 0);
    setShowSaveButton(selectedGroupIds.length > 0);
  }, [selectedCandidates, selectedGroupIds]);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleCandidateSelection = (candidate_id) => {
    setSelectedCandidates((prevSelectedCandidates) => {
      if (prevSelectedCandidates.includes(candidate_id)) {
        return prevSelectedCandidates.filter((id) => id !== candidate_id);
      } else {
        return [...prevSelectedCandidates, candidate_id];
      }
    });
  };

  const handleGroupSelection = (group_id) => {
    setSelectedGroupIds((prevSelectedGroupIds) => {
      if (prevSelectedGroupIds.includes(group_id)) {
        return prevSelectedGroupIds.filter((id) => id !== group_id);
      } else {
        return [...prevSelectedGroupIds, group_id];
      }
    });
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

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveGroups = async () => {
    const payload = {
      candidate_id: selectedCandidates,
      group_id: selectedGroupIds,
    };

    try {
      await axios.post('http://localhost:8000/api/candidategroups', payload);
      setSelectedCandidates([]);
      setSelectedGroupIds([]);
      setOpenDialog(false);
      setSnackbarMessage('Candidates added to groups successfully.');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error adding candidates to groups:', error);
      setSnackbarMessage('Error adding candidates to groups. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Candidates</h1>
      <TextField
        label="Search"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        size="small"
        variant="outlined"
        sx={{ marginBottom: '1rem' }}
      />
      <Button variant="outlined" onClick={handleClearSearch} sx={{ marginBottom: '1rem' }}>
        Clear Search
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Actions</TableCell>
            <TableCell>
              <Button
                variant="outlined"
                onClick={handleAddToGroup}
                disabled={!showAddButton}
              >
                Add to Group
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCandidates.map((candidate) => (
            <TableRow key={candidate.candidate_id}>
              <TableCell>
                {candidate.first_name} {candidate.last_name}
              </TableCell>
              <TableCell>{candidate.email}</TableCell>
              <TableCell>{candidate.phone}</TableCell>
              <TableCell>
                <Button
                  component={Link}
                  to={`/candidates/${candidate.candidate_id}`}
                  variant="outlined"
                  sx={{ marginRight: '0.5rem' }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleCandidateSelection(candidate.candidate_id)}
                  color={selectedCandidates.includes(candidate.candidate_id) ? 'error' : 'inherit'}
                >
                  {selectedCandidates.includes(candidate.candidate_id) ? 'Deselect' : 'Select'}
                </Button>
              </TableCell>
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
      <Button variant="outlined" onClick={handleDeleteCandidates} sx={{ marginTop: '1rem' }}>
        Delete Selected Candidates
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Candidates to Groups</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>Group Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupOptions.map((group) => (
                <TableRow key={group.group_id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedGroupIds.includes(group.group_id)}
                      onChange={() => handleGroupSelection(group.group_id)}
                    />
                  </TableCell>
                  <TableCell>{group.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveGroups} disabled={!showSaveButton} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Candidates;

