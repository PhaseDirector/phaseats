import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Jobs = () => {
  const history = useHistory();
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample array of jobs (replace with your actual API calls)
  const dummyJobs = [
    {
      id: 1,
      title: 'Job 1',
      description: 'Lorem ipsum dolor sit amet',
      location: 'New York',
      requirements: 'Lorem ipsum dolor sit amet'
    },
    {
      id: 2,
      title: 'Job 2',
      description: 'Lorem ipsum dolor sit amet',
      location: 'San Francisco',
      requirements: 'Lorem ipsum dolor sit amet'
    },
    {
      id: 3,
      title: 'Job 3',
      description: 'Lorem ipsum dolor sit amet',
      location: 'London',
      requirements: 'Lorem ipsum dolor sit amet'
    }
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Replace with your actual API call to fetch jobs
        // const response = await fetch('/api/jobs');
        // const data = await response.json();
        // setJobs(data);
        setJobs(dummyJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter jobs based on partial matches
    const filteredJobs = dummyJobs.filter((job) => {
      const { title, description, location } = job;
      const lowerCaseQuery = query.toLowerCase();

      return (
        title.toLowerCase().includes(lowerCaseQuery) ||
        description.toLowerCase().includes(lowerCaseQuery) ||
        location.toLowerCase().includes(lowerCaseQuery)
      );
    });

    setJobs(filteredJobs);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    // Reset jobs to the original list
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
      <h2>Jobs!</h2>
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
            <th>Location</th>
            <th>Requirements</th>
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
              <td>{job.location}</td>
              <td>{job.requirements}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Jobs;



