import React, { useState, useEffect } from 'react';
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
      textAlign: 'center',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexGrow: 1,
      marginTop: '1rem',
      '& > *': {
        marginBottom: '1rem',
      },
    },
    footer: {
      backgroundColor: 'black',
      color: 'white',
      textAlign: 'center',
      padding: '1rem',
    },
  }));


  const CandidateDetails = (props) => {
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
    const [candidate, setCandidate] = useState(null);
  const [editedCandidate, setEditedCandidate] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [candidateId, setCandidateId] = useState(null);


    const fetchCandidateDetails = async () => {
      try {
        const candidateId = props.match.params.id;
        const response = await axios.get(`http://localhost:8000/api/candidates/${candidateId}`);

        setCandidate(response.data);
        setEditedCandidate(response.data);
        setUploadedFile(response.data.file_path || null);
        setCandidateId(response.data.candidate_id);
      } catch (error) {
        console.error('Error fetching candidate details:', error);
      }
    };


    useEffect(() => {

    fetchCandidateDetails();
  }, [props.match.params.id]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  
 
  
  const handleSkillsChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSkills((prevSkills) => [...prevSkills, value]);
    } else {
      setSelectedSkills((prevSkills) => prevSkills.filter((skill) => skill !== value));
    }
  };


  
 

  const handleSpecializationChange = (e) => {
    const { name, value } = e.target;
    setEditedCandidate((prevEditedCandidate) => ({
      ...prevEditedCandidate,
      [name]: value,
    }));
    setSpecialization(value);
    setSelectedSkills([]); // Reset selected skills when changing specialization
    setOpenSkillsDialog(false); // Close the dialog before opening again
    setTimeout(() => setOpenSkillsDialog(true), 0); // Open the dialog after a brief delay
  };





  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCandidate((prevEditedCandidate) => ({
      ...prevEditedCandidate,
      [name]: value,

    }));
  };

  const handleFileDrop = (acceptedFiles) => {
    setUploadedFile(acceptedFiles[0]);
  };

  



  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/uploads?candidateId=${candidateId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const { filename } = response.data;
      const updatedCandidate = {
        ...editedCandidate,
        file_path: `/uploads/${filename}`,
      };

      await axios.put(`http://localhost:8000/api/candidates/${candidateId}`, updatedCandidate);

      setEditedCandidate(updatedCandidate);
      alert('File uploaded and candidate details saved successfully!');
    } catch (error) {
      console.error('Error uploading file and saving candidate details:', error);
      alert('Failed to upload file and save candidate details. Please try again.');
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updatedCandidate = {
        ...editedCandidate,
        skills: selectedSkills.join(', '), // Convert skills array to a string
      };
  
      await axios.put(`http://localhost:8000/api/candidates/${candidate.candidate_id}`, updatedCandidate);
      setCandidate(updatedCandidate);
      alert('Changes saved successfully!');
      setTimeout(() => {
        window.location.href = '/candidates';
      }, 100);
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileDrop,
    multiple: false,
    accept: '.pdf,.doc,.docx',
  });

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
    setEditedCandidate((prevEditedCandidate) => ({
      ...prevEditedCandidate,
      skills: selectedSkills,
    }));
  };

  if (!candidate || !editedCandidate) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.root}>
      <h2>Candidate Details</h2>
      <form>
        <Box className={classes.container}>
          <TextField
            label="First Name"
            name="first_name"
            value={editedCandidate.first_name || ''}
            onChange={handleInputChange}
            className={classes.inputField}
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={editedCandidate.last_name || ''}
            onChange={handleInputChange}
            className={classes.inputField}
          />
          <TextField
            label="Email"
            name="email"
            value={editedCandidate.email || ''}
            onChange={handleInputChange}
            className={classes.inputField}
          />
          <TextField
            label="Address"
            name="address"
            value={editedCandidate.address || ''}
            onChange={handleInputChange}
            className={classes.inputField}
          />
          <TextField
            label="Notes"
            name="notes"
            value={editedCandidate.notes || ''}
            onChange={handleInputChange}
            className={classes.inputField}
          />
               <FormControl className={classes.inputField}>
        <InputLabel>Type</InputLabel>
        <Select
          label="Type"
          value={editedCandidate.type || ''}
          onChange={handleInputChange}
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
          value={editedCandidate.specialization || ''}
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

        </Box>


        
        <Box>
          <h3>File Upload</h3>
          <div {...getRootProps()} style={{ border: '2px dashed #aaa', padding: '1rem', textAlign: 'center' }}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop the file here...</p> : <p>Drag and drop a file here, or click to select a file</p>}
          </div>
          {uploadedFile && (
            <div>
              <p>Selected File: {uploadedFile.name}</p>
              <Button variant="contained" onClick={handleFileUpload}>
                Upload File
              </Button>
            </div>
          )}
        </Box>
        <h2>Attachments</h2>
        {editedCandidate.file_path && (
  <ul>
    <li>
      <a
       href={`http://localhost:8000${editedCandidate.file_path}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {editedCandidate.file_path}
      </a>
    </li>
  </ul>
)}
        
        
        <Button variant="contained" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </form>
      
      <div className={classes.footer}>
        <h3>Phase ATS</h3>
      </div>

    </div>
  );
};

export default CandidateDetails;
