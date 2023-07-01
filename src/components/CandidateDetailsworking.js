import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const CandidateDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [candidate, setCandidate] = useState(null);
  const [editedCandidate, setEditedCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/candidates/${id}`);
        setCandidate(response.data);
        setEditedCandidate(response.data);
      } catch (error) {
        console.error('Error fetching candidate details:', error);
      }
    };

    fetchCandidateDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCandidate((prevEditedCandidate) => ({
      ...prevEditedCandidate,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:8000/api/candidates/${candidate.candidate_id}`, editedCandidate);
      setCandidate(editedCandidate);
      alert('Changes saved successfully!');
      history.push('/candidates'); // Redirect to the candidates page
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  if (!candidate || !editedCandidate) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Candidate Details</h2>
      <table>
        <tbody>
          <tr>
            <th>Candidate ID</th>
            <td>{candidate.candidate_id}</td>
          </tr>
          <tr>
            <th>First Name</th>
            <td>
              <input
                type="text"
                name="first_name"
                value={editedCandidate.first_name || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>
              <input
                type="text"
                name="last_name"
                value={editedCandidate.last_name || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Address</th>
            <td>
              <input
                type="text"
                name="address"
                value={editedCandidate.address || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>
              <input
                type="text"
                name="phone"
                value={editedCandidate.phone || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>
              <input
                type="text"
                name="email"
                value={editedCandidate.email || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Notes</th>
            <td>
              <textarea
                name="notes"
                value={editedCandidate.notes || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Type</th>
            <td>
              <input
                type="text"
                name="type"
                value={editedCandidate.type || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default CandidateDetails;


