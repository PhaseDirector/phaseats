import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const GroupDetails = (props) => {
  const [group, setGroup] = useState(null);
  const [editedGroup, setEditedGroup] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const groupId = props.match.params.id;
        const groupResponse = await axios.get(`http://localhost:8000/api/groups/${groupId}`);
        setGroup(groupResponse.data);
        setEditedGroup(groupResponse.data);

        const candidatesResponse = await axios.get(`http://localhost:8000/api/candidategroups?group_id=${groupId}`);
        setCandidates(candidatesResponse.data);

        const candidateIds = candidatesResponse.data.map((candidate) => candidate.candidate_id);
        const filteredCandidatesResponse = await axios.get(
          `http://localhost:8000/api/candidates?candidate_ids=${candidateIds.join(',')}`
        );
        setFilteredCandidates(filteredCandidatesResponse.data);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchGroupDetails();
  }, [props.match.params.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedGroup((prevEditedGroup) => ({
      ...prevEditedGroup,
      [name]: value,
    }));
  };

  const handleFileSelect = (e) => {
    setUploadedFile(e.target.files[0]);
  };
  

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', uploadedFile);
  
    try {
      await axios.post('http://localhost:8000/api/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }
  };
  

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:8000/api/groups/${group.group_id}`, editedGroup);
      setGroup(editedGroup);
      alert('Changes saved successfully!');
      setTimeout(() => {
        window.location.href = '/groups'; // Redirect to the groups page
      }, 100);
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  if (!group || !editedGroup) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Group Details</h2>
      <table>
        <tbody>
          <tr>
            <th>Group ID</th>
            <td>{group.group_id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileSelect} />

            </td>
          </tr>
          <tr>
            <th>Description</th>
            <td>
              <textarea
                name="description"
                value={editedGroup.description || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Candidates</th>
            <td>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Group ID</th>
                    <th>Candidate ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Notes</th>
                    <th>Type</th>
                    <th>Specialization</th>
                    <th>Skills</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates
                    .filter((row) => row.group_id === group.group_id)
                    .map((row) => {
                      const associatedCandidate = filteredCandidates.find(
                        (candidate) => candidate.candidate_id === row.candidate_id
                      );
                      const firstName = associatedCandidate ? associatedCandidate.first_name : '';
                      const lastName = associatedCandidate ? associatedCandidate.last_name : '';
                      const address = associatedCandidate ? associatedCandidate.address : '';
                      const phone = associatedCandidate ? associatedCandidate.phone : '';
                      const email = associatedCandidate ? associatedCandidate.email : '';
                      const notes = associatedCandidate ? associatedCandidate.notes : '';
                      const type = associatedCandidate ? associatedCandidate.type : '';
                      const specialization = associatedCandidate ? associatedCandidate.specialization : '';
                      const skills = associatedCandidate ? associatedCandidate.skills : '';

                      return (
                        <tr key={row.id}>
                          <td>{row.id}</td>
                          <td>{row.group_id}</td>
                          <td>
                            <a href={`/candidates/${row.candidate_id}`}>{row.candidate_id}</a>
                          </td>
                          <td>{firstName}</td>
                          <td>{lastName}</td>
                          <td>{address}</td>
                          <td>{phone}</td>
                          <td>{email}</td>
                          <td>{notes}</td>
                          <td>{type}</td>
                          <td>{specialization}</td>
                          <td>{skills}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <button onClick={handleSaveChanges}>Save Changes</button>

      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileSelect} />
      {uploadedFile && (
  <div>
    <p>Uploaded File: {uploadedFile.name}</p>
    <Button variant="contained" onClick={handleFileUpload}>
      Upload
    </Button>
  </div>
)}

    </div>
  );
};

export default GroupDetails;
