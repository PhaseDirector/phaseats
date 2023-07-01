import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobDetails = (props) => {
  const [job, setJob] = useState(null);
  const [editedJob, setEditedJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobId = props.match.params.id; // Extract the job ID from the URL
        const response = await axios.get(`http://localhost:8000/api/jobs/${jobId}`);
        setJob(response.data);
        setEditedJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [props.match.params.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedJob((prevEditedJob) => ({
      ...prevEditedJob,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:8000/api/jobs/${job.job_id}`, editedJob);
      setJob(editedJob);
      alert('Changes saved successfully!');
      window.location.href = '/jobs'; // Redirect to the jobs page
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  if (!job || !editedJob) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Job Details</h2>
      <table>
        <tbody>
          <tr>
            <th>Job ID</th>
            <td>{job.job_id}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>
              <input
                type="text"
                name="job_title"
                value={editedJob.job_title || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Description</th>
            <td>
              <textarea
                name="description"
                value={editedJob.description || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Location</th>
            <td>
              <input
                type="text"
                name="location"
                value={editedJob.location || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <th>Requirements</th>
            <td>
              <textarea
                name="requirements"
                value={editedJob.requirements || ''}
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

export default JobDetails;
