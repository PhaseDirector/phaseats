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

const CreateClient = () => {
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [notes, setNotes] = useState('');
  const history = useHistory();

  const classes = useStyles();

  const handleClientNameChange = (e) => {
    setClientName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleWebsiteChange = (e) => {
    setWebsite(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newClient = {
      client_name: clientName,
      address,
      website,
      notes,
    };

    try {
      await axios.post('http://localhost:8000/api/clients', newClient);
      console.log('Client created successfully');
      // Reset the form fields
      setClientName('');
      setAddress('');
      setWebsite('');
      setNotes('');
      // Redirect to Clients component
      history.push('/clients');
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  return (
    <div className={classes.root}>
      <h1>Create Client</h1>
      <Box className={classes.container}>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Client Name"
              value={clientName}
              onChange={handleClientNameChange}
              className={classes.inputField}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Address"
              value={address}
              onChange={handleAddressChange}
              className={classes.inputField}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Website"
              value={website}
              onChange={handleWebsiteChange}
              className={classes.inputField}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Notes"
              value={notes}
              onChange={handleNotesChange}
              className={classes.inputField}
            />
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="outlined" type="submit">
              Create
            </Button>
          </Box>
        </form>
      </Box>
      <Box flexGrow={1} /> {/* Spacer to push footer to the bottom */}
      <div className={classes.footer}>
        <h3>Phase ATS</h3>
      </div>
    </div>
  );
};

export default CreateClient;
