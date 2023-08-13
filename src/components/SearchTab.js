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

const SearchTab = () => {
  const classes = useStyles();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [clients, setClients] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterClients, filteredClients] = useState([]);
  const [AddToGroup, handleAddToGroup] = useState([]);
  const [filterCandidates, filteredCandidates] = useState([]);

  
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

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);


   
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

  const handleDeleteClients = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete the selected clients?');
    if (!confirmDelete) {
      return;
    }

    try {
      await Promise.all(
        selectedClients.map(async (client) => {
          await axios.delete(`http://localhost:8000/api/clients/${client.client_id}`);
        })
      );

      const response = await axios.get('http://localhost:8000/api/clients');
      setClients(response.data);
      setSelectedClients([]);
      setSnackbarMessage('Selected clients deleted successfully.');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting clients:', error);
      setSnackbarMessage('Error deleting clients. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleSelectAllClients = () => {
    setSelectedClients(selectedClients.length === clients.length ? [] : clients);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSelectClient = (client_id) => {
    setSelectedClients((prevSelectedClients) => {
      if (prevSelectedClients.includes(client_id)) {
        return prevSelectedClients.filter((id) => id !== client_id);
      } else {
        return [...prevSelectedClients, client_id];
      }
    });
  };

  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const handleJobSelection = (jobId) => {
    setSelectedJobs((prevSelectedJobs) => {
      if (prevSelectedJobs.includes(jobId)) {
        return prevSelectedJobs.filter((id) => id !== jobId);
      } else {
        return [...prevSelectedJobs, jobId];
      }
    });
  };

  const handleDeleteJobs = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete the selected jobs?');
    if (!confirmDelete) {
      return;
    }

    try {
      await Promise.all(
        selectedJobs.map(async (jobId) => {
          await axios.delete(`http://localhost:8000/api/jobs/${jobId}`);
        })
      );

      const response = await axios.get('http://localhost:8000/api/jobs');
      setJobs(response.data);
      setSelectedJobs([]);
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting jobs:', error);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const { job_title, description, location, requirements } = job;
    const lowerCaseQuery = searchQuery.toLowerCase();

    const handleAddToGroup = () => {
      setOpenDialog(true);
    };


  const filteredClients = clients.filter(
    (client) =>
      client.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.notes.toLowerCase().includes(searchQuery.toLowerCase())
      // Add more conditions here if needed
  );



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

  return (
    job_title.toLowerCase().includes(lowerCaseQuery) ||
    description.toLowerCase().includes(lowerCaseQuery) ||
    location.toLowerCase().includes(lowerCaseQuery) ||
    requirements.toLowerCase().includes(lowerCaseQuery)
  );
});


  console.log('Candidates:', candidates);
  console.log('Search Query:', searchQuery);
  console.log('Selected Candidates:', selectedCandidates);

  return (
    <div className={classes.root}>
      <h1>Search</h1>
      <Box display="flex" justifyContent="center">
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          size="small"
          variant="outlined"
          sx={{ width: '50%', marginBottom: '1rem' }} />
      </Box>
      <Box display="flex" justifyContent="center">
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          size="small"
          variant="outlined"
          sx={{ width: '50%', marginBottom: '1rem' }} />
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
          variant="contained"
          onClick={handleDeleteClients}
          disabled={selectedClients.length === 0}
        >
          Delete Selected
        </Button>

        <Button
          variant="outlined"
          onClick={handleAddToGroup}
          disabled={selectedClients.length === 0}
        >
          Add to Group
        </Button>
        <Button
          variant="outlined"
          component={Link}
          to="/createclient"
          className={classes.addButton}>
          Add Client
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
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Client ID</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Website</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>
              <Checkbox
                checked={selectedClients.length === clients.length}
                onChange={handleSelectAllClients} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredClients.map((client) => (
            <TableRow key={client.client_id}>
              <TableCell>
                <Link to={`/clients/${client.client_id}`}>{client.client_id}</Link>
              </TableCell>
              <TableCell style={{ color: 'white' }}>{client.client_name}</TableCell>
              <TableCell style={{ color: 'white' }}>{client.address}</TableCell>
              <TableCell style={{ color: 'white' }}>{client.website}</TableCell>
              <TableCell style={{ color: 'white' }}>{client.notes}</TableCell>
              <TableCell>
                <Checkbox
                  checked={selectedClients.includes(client)}
                  onChange={() => handleSelectClient(client)}
                  style={{ color: 'white' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        {/* ... (dialog content) */}
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    <div><h3>Candidates</h3><Button
      variant="outlined"
      component={Link}
      to="/createcandidate"
      className={classes.addButton}
      sx={{ width: '200px', marginRight: '1rem', marginLeft: '1rem' }}
    >
        Add Candidate
      </Button><Button
        variant="outlined"
        component={Link}
        to="/"
        className={classes.addButton}
        sx={{ width: '200px', marginLeft: '1rem' }}
      >
        Home
      </Button><Box display="flex" justifyContent="center" mt={2}></Box><Button
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
                  style={{ color: 'white' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>


        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Job ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Requirements</TableCell>
              <TableCell>Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.job_id}>
                <TableCell>
                  <Link to={`/jobs/${job.job_id}`}>{job.job_id}</Link>
                </TableCell>
                <TableCell style={{ color: 'white' }}>{job.job_title}</TableCell>
                <TableCell style={{ color: 'white' }}>{job.description}</TableCell>
                <TableCell style={{ color: 'white' }}>{job.location}</TableCell>
                <TableCell style={{ color: 'white' }}>{job.requirements}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={selectedJobs.includes(job.job_id)}
                    onChange={() => handleJobSelection(job.job_id)}
                    style={{ color: 'white' }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={() => setOpenSnackbar(false)}
          sx={{ color: 'white' }}
        >
          Jobs deleted successfully.
        </Snackbar>
      </div>
    </div>
  );
};

export default SearchTab;
