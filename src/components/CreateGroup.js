import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const CreateGroup = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (e) => {
    const groupName = e.target.value;
    setName(groupName);
  };

  const handleDescriptionChange = (e) => {
    const groupDescription = e.target.value;
    setDescription(groupDescription);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/groups', {
        name,
        description: description || null, // Set description to null if it is blank
      });
      history.push('/groups');
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div>
      <h2>Create Group</h2>
      <form onSubmit={handleSubmit}>
        <TextField label="Group Name" value={name} onChange={handleNameChange} required />
        <TextField label="Group Description" value={description} onChange={handleDescriptionChange} />
        <Button variant="contained" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateGroup;
