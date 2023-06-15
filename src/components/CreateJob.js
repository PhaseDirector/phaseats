import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateJob = () => {
  const [jobs, setJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState({
    id: '',
    title: '',
    description: '',
    location: '',
    requirements: '',
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddJob = () => {
    if (jobDetails.title && jobDetails.description && jobDetails.location) {
      const newJob = {
        ...jobDetails,
        id: generateJobId(),
      };
      setJobs((prevJobs) => [...prevJobs, newJob]);
      setJobDetails({
        id: '',
        title: '',
        description: '',
        location: '',
        requirements: '',
      });
      history.push('/jobs'); // Redirect to the Jobs component
    }
  };

  // Generate a 4-digit job ID automatically
  function generateJobId() {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `J${randomNumber}`;
  }

  return (
    <div>
      <h2>Create Job</h2>
      <label htmlFor="jobTitle">Job Title:</label>
      <input
        type="text"
        id="jobTitle"
        name="title"
        value={jobDetails.title}
        onChange={handleChange}
      />
      <label htmlFor="jobDescription">Description:</label>
      <textarea
        id="jobDescription"
        name="description"
        value={jobDetails.description}
        onChange={handleChange}
      ></textarea>
      <label htmlFor="jobLocation">Location:</label>
      <input
        type="text"
        id="jobLocation"
        name="location"
        value={jobDetails.location}
        onChange={handleChange}
      />
      <label htmlFor="jobRequirements">Requirements:</label>
      <textarea
        id="jobRequirements"
        name="requirements"
        value={jobDetails.requirements}
        onChange={handleChange}
      ></textarea>
      <button onClick={handleAddJob}>Add Job</button>
    </div>
  );
};

export default CreateJob;

