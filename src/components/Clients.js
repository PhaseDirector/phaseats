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

const Clients = () => {
  const classes = useStyles();
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClients, setSelectedClients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
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

  const handleAddToGroup = () => {
    setOpenDialog(true);
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






  const filteredClients = clients.filter(
    (client) =>
      client.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.notes.toLowerCase().includes(searchQuery.toLowerCase())
      // Add more conditions here if needed
  );

  return (
    <div className={classes.root}>
      <h1>Clients</h1>
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
                onChange={handleSelectAllClients}
              />
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
                  style={{ color: 'white' }}
                />
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
    </div>
   
  );
};

export default Clients;
