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
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  inputField: {
    width: '100%',
  },
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'Arial',
    padding: '1rem',
    '& .MuiInputBase-root': {
      color: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'white',
      textAlign: 'center',
    },
    '& .MuiSelect-root': {
      color: 'white',
    },
    '& .MuiCheckbox-colorPrimary.Mui-checked': {
      color: 'white',
    },

checkboxCell: {
    color: 'white',
  },

    textAlign: 'center', // Center-align the "Create Job" title
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    marginBottom: '1rem',
    '& > *': {
      marginBottom: '1rem', // Add margin between each input field
    },
  },
  footer: {
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
  },
}));

const Candidates = () => {
  const classes = useStyles();
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
    try {
      for (const candidateId of selectedCandidates) {
        for (const groupId of selectedGroupIds) {
          const payload = {
            candidate_id: candidateId,
            group_id: groupId,
          };
          await axios.post('http://localhost:8000/api/candidategroups', payload);
        }
      }
  
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
      candidate.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.skills.toLowerCase().includes(searchQuery.toLowerCase())
   
  );

  console.log('Candidates:', candidates);
  console.log('Search Query:', searchQuery);
  console.log('Selected Candidates:', selectedCandidates);
  console.log('Selected Group IDs:', selectedGroupIds);
  console.log('Group Options:', groupOptions);

  return (
    <div className={classes.root}>
      <h1>Candidates</h1>
      <Box display="flex" justifyContent="center">
      <TextField
        label="Search"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        size="small"
        variant="outlined"
        sx={{ width: '50%', marginBottom: '1rem' }}
      />
      </Box>
      
      <Box display="flex" justifyContent="space-between" mt={2}>
  <Button
    variant="outlined"
    onClick={handleClearSearch}
    className={classes.clearButton}
    sx={{ width: '200px', marginRight: '1rem' }}
  >
    Clear Search
  </Button>

  <Button
    variant="outlined"
    component={Link}
    to="/createcandidate"
    className={classes.addButton}
    sx={{ width: '200px', marginRight: '1rem', marginLeft: '1rem' }}
  >
    Add Candidate
  </Button>

  <Button
    variant="outlined"
    component={Link}
    to="/"
    className={classes.addButton}
    sx={{ width: '200px', marginLeft: '1rem' }}
  >
    Home
  </Button>
</Box>

<Box display="flex" justifyContent="center" mt={2}></Box>
      
      <Button
  variant="contained"
  onClick={handleDeleteCandidates}
  className={classes.addButton}
  disabled={selectedCandidates.length === 0}
>
  Delete Selected Candidates
</Button>




      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Candidate ID</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Email</TableCell>
      <TableCell>Phone</TableCell>
      <TableCell>Address</TableCell>
      <TableCell>Notes</TableCell>
      <TableCell>Type</TableCell>
      <TableCell>Specialization</TableCell>
      <TableCell>Skills</TableCell>
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
        <Link to={`/candidates/${candidate.candidate_id}`}>
          {candidate.candidate_id}
        </Link>
      </TableCell>
      <TableCell style={{ color: 'white' }}>{candidate.first_name} {candidate.last_name}</TableCell>
      <TableCell style={{ color: 'white' }}>{candidate.email}</TableCell>
      <TableCell style={{ color: 'white' }}>{candidate.phone}</TableCell>
      <TableCell style={{ color: 'white' }}>{candidate.address}</TableCell>
      <TableCell style={{ color: 'white' }}>{candidate.notes}</TableCell>
      <TableCell style={{ color: 'white' }}>{candidate.type}</TableCell>
      <TableCell style={{ color: 'white' }}>{candidate.specialization}</TableCell>
      <TableCell style={{ color: 'white' }}>{candidate.skills}</TableCell>
      <TableCell>
        <Button
          component={Link}
          to={`/candidates/${candidate.candidate_id}`}
          variant="outlined"
          sx={{ marginRight: '0.5rem' }}
        >
          Edit
        </Button>
      </TableCell>
      <TableCell>
                <Checkbox
                  checked={selectedCandidates.includes(candidate.candidate_id)}
                  onChange={() => handleCandidateSelection(candidate.candidate_id)}
                  // Add the custom style for the checkboxes
                  style={{ color: 'white' }}
                />
              </TableCell>
    </TableRow>
  ))}
</TableBody>


      </Table>
    
      



      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Candidates to Groups</DialogTitle>
        <DialogContent className={classes.dialogContent}>
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
