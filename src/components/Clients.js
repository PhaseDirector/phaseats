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

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClients, setSelectedClients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [groupOptions, setGroupOptions] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
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

    const fetchGroupOptions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/clientgroups');
        setGroupOptions(response.data);
      } catch (error) {
        console.error('Error fetching group options:', error);
      }
    };


    fetchClients();
    fetchGroupOptions();
  }, []);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleClientSelection = (clientId) => {
    setSelectedClients((prevSelectedClients) => {
      if (prevSelectedClients.includes(clientId)) {
        return prevSelectedClients.filter((id) => id !== clientId);
      } else {
        return [...prevSelectedClients, clientId];
      }
    });
  };

  const handleDeleteClients = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete the selected clients?');
    if (!confirmDelete) {
      return;
    }

    try {
      // Delete the selected clients
      await Promise.all(
        selectedClients.map(async (clientId) => {
          await axios.delete(`http://localhost:8000/api/clients/${clientId}`);
        })
      );
 // Refresh the client list
 const response = await axios.get('http://localhost:8000/api/clients');
 setClients(response.data);
 // Clear selected clients
 setSelectedClients([]);
 // Show success message
 setSnackbarMessage('Selected clients deleted successfully.');
 setOpenSnackbar(true);
} catch (error) {
 console.error('Error deleting clients:', error);
 // Show error message
 setSnackbarMessage('Error deleting clients. Please try again.');
 setOpenSnackbar(true);
}
};

const handleAddToGroup = () => {
setOpenDialog(true);
};

const handleDialogClose = () => {
setOpenDialog(false);
};

const handleGroupSelection = (e) => {
const groupId = e.target.value;
setSelectedGroup(groupId);
};

const handleAddToGroupSubmit = async () => {
try {
 await Promise.all(
   selectedClients.map(async (clientId) => {
     await axios.post(`http://localhost:8000/api/clientsgroups`, {
       client_id: clientId,
       group_id: selectedGroup,
     });
   })
 );
 // Clear selected clients
 setSelectedClients([]);
 // Close dialog
 setOpenDialog(false);
 // Show success message
 setSnackbarMessage('Selected clients added to group successfully.');
 setOpenSnackbar(true);
} catch (error) {
 console.error('Error adding clients to group:', error);
 // Show error message
 setSnackbarMessage('Error adding clients to group. Please try again.');
 setOpenSnackbar(true);
}
};

const handleSnackbarClose = () => {
setOpenSnackbar(false);
};


  const filteredClients = clients.filter((client) => {
    const { client_name, address, website, notes } = client;
    const lowerCaseQuery = searchQuery.toLowerCase();
    const fieldsToSearch = [
      'client_name',
      'address',
      'website',
      'notes',
    ];
    
    return fieldsToSearch.some((field) => {
      const fieldValue = client[field] || '';
      return fieldValue.toLowerCase().includes(lowerCaseQuery);
    });
  });

return (

< div>
      <h2>Clients</h2>
      <div>
        <TextField label="Client Quick Search" value={searchQuery} onChange={handleSearchQueryChange} />
        <Button variant="outlined" onClick={handleClearSearch}>
          Clear
        </Button>
        <Button variant="contained" onClick={handleDeleteClients} disabled={selectedClients.length === 0}>
          Delete Selected
        </Button>
        <Button variant="contained" onClick={handleAddToGroup} disabled={selectedClients.length === 0}>
          Add to Group
        </Button>
        <Link to="/createclient">Add Client</Link>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client ID</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Website</TableCell>
            <TableCell>Notes</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {filteredClients.map((client) => (
            <TableRow key={client.client_id}>
              <TableCell>
                <Link to={`/clients/${client.client_id}`}>{client.client_id}</Link>
              </TableCell>
              <TableCell>{client.client_name}</TableCell>
              <TableCell>{client.address}</TableCell>
              <TableCell>{client.website}</TableCell>
              <TableCell>{client.notes}</TableCell>
               <TableCell>
                <Checkbox
                  checked={selectedClients.includes(client.client_id)}
                  onChange={() => handleClientSelection(client.client_id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add Selected Clients to Group</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Select Group</InputLabel>
            <Select value={selectedGroup} onChange={handleGroupSelection}>
              {groupOptions.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddToGroupSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose} message={snackbarMessage} />
    </div>
  );
              };

export default Clients;

