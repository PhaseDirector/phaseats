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

const Jobs = () => {
  const classes = useStyles();
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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

    return (
      job_title.toLowerCase().includes(lowerCaseQuery) ||
      description.toLowerCase().includes(lowerCaseQuery) ||
      location.toLowerCase().includes(lowerCaseQuery) ||
      requirements.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div className={classes.root}>
      <h1>Jobs</h1>
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
    to="/createjob"
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
        onClick={handleDeleteJobs}
        disabled={selectedJobs.length === 0}
      >
        Delete Selected Jobs
      </Button>





       

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
                  style={{ color: 'white' }}
                />
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
  );
};

export default Jobs;
