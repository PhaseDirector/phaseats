import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateJob = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [requirements, setRequirements] = useState('');

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

      const newJob = {
        job_title: jobTitle,
        description,
        location,
        requirements,
      };

      try {
      await axios.post('http://localhost:8000/api/jobs', newJob);
      console.log('Job created successfully');
      // Reset the form fields
      setJobTitle('');
      setDescription('');
      setLocation('');
      setRequirements('');
      // Redirect to Clients component
      history.push('/jobs');
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };


  return (
    <div>
      <h2>Create Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="requirements">Requirements:</label>
          <textarea
            id="requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateJob;