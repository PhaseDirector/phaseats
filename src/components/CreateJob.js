import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  inputField: {
    width: '25%',
  },
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    textAlign: 'center', // Center-align the "Create Job" title
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    marginTop: '1rem',
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

const CreateJob = () => {
  const classes = useStyles();
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [requirements, setRequirements] = useState('');
  const history = useHistory();

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleRequirementsChange = (e) => {
    setRequirements(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      job_title: jobTitle,
      description,
      location,
      requirements,
    };

    try {
      await axios.post('http://localhost:8000/api/jobs', newJob);
      console.log('Job created successfully');
      // Reset the form fields
      setJobTitle('');
      setDescription('');
      setLocation('');
      setRequirements('');
      // Redirect to Jobs component
      history.push('/jobs');
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <div className={classes.root}>
      <h2>Create Job</h2>
      <form onSubmit={handleSubmit}>
        <Box className={classes.container}>
          <TextField
            label="Job Title"
            value={jobTitle}
            onChange={handleJobTitleChange}
            className={classes.inputField}
          />
          <TextField
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
            className={classes.inputField}
          />
          <TextField
            label="Location"
            value={location}
            onChange={handleLocationChange}
            className={classes.inputField}
          />
          <TextField
            label="Requirements"
            value={requirements}
            onChange={handleRequirementsChange}
            className={classes.inputField}
          />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="outlined" type="submit">
            Create
          </Button>
        </Box>
      </form>
      <div className={classes.footer}>
        <h3>Phase ATS</h3>
      </div>
    </div>
  );
};

export default CreateJob;
