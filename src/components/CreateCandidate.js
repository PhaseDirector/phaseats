import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from '@mui/material';

const CreateCandidate = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [type, setType] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const history = useHistory();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSpecializationChange = (e) => {
    const { value } = e.target;
    setSpecialization(value);
  };

  const handleSkillsChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSkills((prevSkills) => [...prevSkills, value]);
    } else {
      setSelectedSkills((prevSkills) => prevSkills.filter((skill) => skill !== value));
    }
  };
  

  const handleCreateCandidate = async () => {
    try {
      const newCandidate = {
        first_name: firstName,
        last_name: lastName,
        address,
        phone,
        email,
        notes,
        type,
        specialization,
        skills: selectedSkills.join(', '),
      };

      await axios.post('http://localhost:8000/api/candidates', newCandidate);
      history.push('/candidates');
    } catch (error) {
      console.error('Error creating candidate:', error);
    }
  };

  const specializationOptions = [
    { value: 'Developer', skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'C++'] },
    { value: 'Tester', skills: ['Manual Testing', 'Automated Testing', 'Regression Testing', 'Load Testing'] },
    { value: 'Project Manager', skills: ['Infrastructure', 'Development', 'Business', 'Mix'] },
    { value: 'Business Analyst', skills: ['Requirements Gathering', 'Process Mapping', 'Data Analysis'] },
    { value: 'ERP/CRM', skills: ['SAP', 'Oracle', 'Salesforce', 'Microsoft Dynamics'] },
    { value: 'Cloud Engineer', skills: ['AWS', 'Azure', 'Google Cloud', 'DevOps'] },
    { value: 'DevOps', skills: ['CI/CD', 'Containerization', 'Infrastructure as Code'] },
    { value: 'Manager', skills: ['Leadership', 'Team Management', 'Project Planning'] },
  ];

  return (
    <div>
      <h2>Create Candidate</h2>
      <form>
        <div>
          <TextField label="First Name" value={firstName} onChange={handleFirstNameChange} />
        </div>
        <div>
          <TextField label="Last Name" value={lastName} onChange={handleLastNameChange} />
        </div>
        <div>
          <TextField label="Address" value={address} onChange={handleAddressChange} />
        </div>
        <div>
          <TextField label="Phone" value={phone} onChange={handlePhoneChange} />
        </div>
        <div>
          <TextField label="Email" type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <TextField label="Notes" multiline value={notes} onChange={handleNotesChange} />
        </div>
        <div>
          <FormControl>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={handleTypeChange}>
              <MenuItem value="">Select Type</MenuItem>
              <MenuItem value="Full-Time">Full-Time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
              <MenuItem value="Part-Time">Part-Time</MenuItem>
             
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel>Specialization</InputLabel>
            <Select value={specialization} onChange={handleSpecializationChange}>
              <MenuItem value="">Select Specialization</MenuItem>
              {specializationOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {specialization && (
          <div>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <FormControl component="fieldset">
                <InputLabel>Skills</InputLabel>
                <FormGroup>
                  {specializationOptions.find((option) => option.value === specialization).skills.map((skill) => (
                    <FormControlLabel
                      key={skill}
                      control={
                        <Checkbox
                          checked={selectedSkills.includes(skill)}
                          value={skill}
                          onChange={handleSkillsChange}
                        />
                      }
                      label={skill}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Box>
          </div>
        )}
        <Button variant="contained" onClick={handleCreateCandidate}>
          Create Candidate
        </Button>
      </form>
    </div>
  );
};

export default CreateCandidate;




