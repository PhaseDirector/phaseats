import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const history = useHistory();

  // Dummy job data for demonstration
  const dummyJobs = [
    { id: '001', title: 'Job A', description: 'Description for Job A' },
    { id: '002', title: 'Job B', description: 'Description for Job B' },
    { id: '003', title: 'Job C', description: 'Description for Job C' },
    { id: '004', title: 'Job D', description: 'Description for Job D' },
    { id: '005', title: 'Job E', description: 'Description for Job E' },
    // Add more jobs as needed
  ];

  useEffect(() => {
    // Simulating API call to fetch jobs
    // Replace this with your actual API call to fetch jobs
    setJobs(dummyJobs);
  }, []);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter jobs based on partial matches
    const filteredJobs = dummyJobs.filter((job) => {
      const { id, title, description } = job;
      const lowerCaseQuery = query.toLowerCase();

      return (
        id.toLowerCase().includes(lowerCaseQuery) ||
        title.toLowerCase().includes(lowerCaseQuery) ||
        description.toLowerCase().includes(lowerCaseQuery)
      );
    });

    setJobs(filteredJobs);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setJobs(dummyJobs);
  };

  const handleAddJob = () => {
    // Save job details and perform necessary actions
    // For now, let's just navigate to the CreateJob page
    history.push('/createjob');
  };

  const handleJobClick = (jobId) => {
    // Redirect to job page using the job ID
    history.push(`/job/${jobId}`);
  };

  return (
    <div>
      <h2>Jobs</h2>
      <div>
        <label htmlFor="searchQuery">Search Job:</label>
        <input
          type="text"
          id="searchQuery"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button onClick={handleClearSearch}>Clear</button>
        <button onClick={handleAddJob}>Add Job</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>
                <a href={`/job/${job.id}`} onClick={() => handleJobClick(job.id)}>
                  {job.id}
                </a>
              </td>
              <td>
                <a href={`/job/${job.id}`} onClick={() => handleJobClick(job.id)}>
                  {job.title}
                </a>
              </td>
              <td>{job.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Jobs;


