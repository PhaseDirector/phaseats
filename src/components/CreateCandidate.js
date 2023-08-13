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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDropzone } from 'react-dropzone';

const useStyles = makeStyles((theme) => ({
  inputField: {
    width: '25%',
  },
  root: {
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'Arial',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  centeredInput: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
  },
  skillsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
    width: '75%',
  },
  skillsColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  dropzoneContainer: {
    width: '100%',
    height: '200px',
    border: '1px dashed gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  dropzoneText: {
    color: 'gray',
  },
}));

const CreateCandidate = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [type, setType] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [openSkillsDialog, setOpenSkillsDialog] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
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
    setOpenSkillsDialog(true);
  };

  const handleSkillsChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSkills((prevSkills) => [...prevSkills, value]);
    } else {
      setSelectedSkills((prevSkills) => prevSkills.filter((skill) => skill !== value));
    }
  };

  const handleFileDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      name: file.name,
      file,
    }));
    setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
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
  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleFileDrop });

  const specializationOptions = [
    {
      value: 'Developer',
      skills: [
        'HTML',
        'CSS',
        'JavaScript',
        'Python',
        'Java',
        'C++',
        'C# (C-Sharp)',
        'VB (Visual Basic)',
        'VB6 (Visual Basic 6)',
        '.NET (DotNet)',
        'ASP.NET',
        'ASP.NET Core',
        'Azure',
        'SQL Server',
        'Entity Framework',
        'Visual Studio',
        'Xamarin',
        'WPF (Windows Presentation Foundation)',
        'WinForms (Windows Forms)',
        'Azure DevOps',
        'PowerShell',
      ],
    },
    { value: 'Tester', skills: ['Manual Testing', 'Automated Testing', 'Regression Testing', 'Load Testing'] },
    { value: 'Project Manager', skills: ['Infrastructure', 'Development', 'Business', 'Mix'] },
    { value: 'Business Analyst', skills: ['Requirements Gathering', 'Process Mapping', 'Data Analysis'] },
    { value: 'ERP/CRM', skills: ['SAP', 'Oracle', 'Salesforce', 'Microsoft Dynamics'] },
    { value: 'Cloud Engineer', skills: ['AWS', 'Azure', 'Google Cloud', 'DevOps'] },
    { value: 'DevOps', skills: ['CI/CD', 'Containerization', 'Infrastructure as Code'] },
    { value: 'Manager', skills: ['Leadership', 'Team Management', 'Project Planning'] },
  ];

  const selectedSpecialization = specializationOptions.find((option) => option.value === specialization);
  const selectedSkillsArray = selectedSpecialization ? selectedSpecialization.skills : [];

  const handleSkillsDialogClose = () => {
    setOpenSkillsDialog(false);
  };

  return (
    <div className={classes.root}>
      <h1>Create Candidate</h1>
      <Box display="flex" justifyContent="flex-end" mb={2} className={classes.container}>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
        <div className={classes.dropzoneContainer} {...getRootProps({ onDrop: handleFileDrop })}>
  <input {...getInputProps()} />
  {isDragActive ? (
    <p className={classes.dropzoneText}>Drop files here...</p>
  ) : (
    <p className={classes.dropzoneText}>Drag and drop files here, or click to select files</p>
  )}
</div>
        </Box>
      </Box>

      <TextField label="First Name" value={firstName} onChange={handleFirstNameChange} className={classes.inputField} />
      <TextField label="Last Name" value={lastName} onChange={handleLastNameChange} className={classes.inputField} />
      <TextField label="Address" value={address} onChange={handleAddressChange} className={classes.inputField} />
      <TextField label="Phone" value={phone} onChange={handlePhoneChange} className={classes.inputField} />
      <TextField label="Email" type="email" value={email} onChange={handleEmailChange} className={classes.inputField} />
      <TextField label="Notes" multiline value={notes} onChange={handleNotesChange} className={classes.inputField} />

      <FormControl className={classes.inputField}>
        <InputLabel>Type</InputLabel>
        <Select
          label="Type"
          value={type}
          onChange={handleTypeChange}
          inputProps={{
            name: 'type',
            id: 'type-input',
          }}
        >
          <MenuItem value="">Select Type</MenuItem>
          <MenuItem value="Full-Time">Full-Time</MenuItem>
          <MenuItem value="Contract">Contract</MenuItem>
          <MenuItem value="Part-Time">Part-Time</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.inputField}>
        <InputLabel>Specialization</InputLabel>
        <Select
          value={specialization}
          onChange={handleSpecializationChange}
          inputProps={{
            name: 'specialization',
            id: 'specialization-input',
          }}
        >
          <MenuItem value="">Select Specialization</MenuItem>
          {specializationOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Dialog open={openSkillsDialog} onClose={handleSkillsDialogClose}>
        <DialogTitle>Select Skills</DialogTitle>
        <DialogContent>
          <div className={classes.skillsContainer}>
            <div className={classes.skillsColumn}>
              <h3>General Skills</h3>
              <FormGroup>
                {selectedSkillsArray.map((skill) => (
                  <FormControlLabel
                    key={skill}
                    control={<Checkbox checked={selectedSkills.includes(skill)} value={skill} onChange={handleSkillsChange} />}
                    label={skill}
                  />
                ))}
              </FormGroup>
            </div>
            {specialization === 'Developer' && (
              <div className={classes.skillsColumn}>
                <h3>.Net/Microsoft Skills</h3>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={selectedSkills.includes('C#')} value="C#" onChange={handleSkillsChange} />}
                    label="C# (C-Sharp)"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedSkills.includes('VB')} value="VB" onChange={handleSkillsChange} />}
                    label="VB (Visual Basic)"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedSkills.includes('VB6')} value="VB6" onChange={handleSkillsChange} />}
                    label="VB6 (Visual Basic 6)"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedSkills.includes('.NET')} value=".NET" onChange={handleSkillsChange} />}
                    label=".NET (DotNet)"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedSkills.includes('ASP.NET')} value="ASP.NET" onChange={handleSkillsChange} />}
                    label="ASP.NET"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedSkills.includes('ASP.NET Core')} value="ASP.NET Core" onChange={handleSkillsChange} />}
                    label="ASP.NET Core"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedSkills.includes('Azure')} value="Azure" onChange={handleSkillsChange} />}
                    label="Azure"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedSkills.includes('SQL Server')} value="SQL Server" onChange={handleSkillsChange} />}
                    label="SQL Server"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedSkills.includes('Entity Framework')} value="Entity Framework" onChange={handleSkillsChange} />}
                    label="Entity Framework"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedSkills.includes('Visual Studio')} value="Visual Studio" onChange={handleSkillsChange} />}
                    label="Visual Studio"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedSkills.includes('Xamarin')} value="Xamarin" onChange={handleSkillsChange} />}
                    label="Xamarin"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedSkills.includes('WPF')} value="WPF" onChange={handleSkillsChange} />}
                    label="WPF (Windows Presentation Foundation)"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedSkills.includes('WinForms')} value="WinForms" onChange={handleSkillsChange} />}
                    label="WinForms (Windows Forms)"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedSkills.includes('Azure DevOps')} value="Azure DevOps" onChange={handleSkillsChange} />}
                    label="Azure DevOps"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedSkills.includes('PowerShell')} value="PowerShell" onChange={handleSkillsChange} />}
                    label="PowerShell"
                  />
                </FormGroup>
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSkillsDialogClose}>Cancel</Button>
          <Button onClick={handleSkillsDialogClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Box mt={2} />

      
      
      <Button variant="contained" onClick={handleCreateCandidate}>
        Create Candidate
      </Button>
      <div>
  <h3>Uploaded Files:</h3>
  <ul>
    {uploadedFiles.map((fileObj, index) => (
      <li key={index}>{fileObj.name}</li>
    ))}
  </ul>
</div>

      <div className={classes.footer}>
        <h3>Phase ATS</h3>
      </div>
    </div>
  );
};

export default CreateCandidate;
