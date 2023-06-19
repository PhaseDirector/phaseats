import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobs, setSelectedJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleJobSelection = (jobId) => {
    setSelectedJobs((prevSelectedJobs) => {
      if (prevSelectedJobs.includes(jobId)) {
        return prevSelectedJobs.filter((id) => id !== jobId);
      } else {
        return [...prevSelectedJobs, jobId];
      }
    });
  };

  const handleArchiveJobs = async () => {
    try {
      await axios.post('http://localhost:8000/api/archive', {
        jobIds: selectedJobs,
      });
      // Refresh the job list
      const response = await axios.get('http://localhost:8000/api/jobs');
      setJobs(response.data);
      // Clear selected jobs
      setSelectedJobs([]);
    } catch (error) {
      console.error('Error archiving jobs:', error);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const { job_title, description, location, requirements } = job;
    const lowerCaseQuery = searchQuery.toLowerCase();

    return (
      job_title.toLowerCase().includes(lowerCaseQuery) ||
      description.toLowerCase().includes(lowerCaseQuery) ||
      location.toLowerCase().includes(lowerCaseQuery) ||
      requirements.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div>
      <h2>Jobs</h2>
      <div>
        <label htmlFor="searchQuery">Search Jobs:</label>
        <input
          type="text"
          id="searchQuery"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button onClick={handleClearSearch}>Clear</button>
        <button onClick={handleArchiveJobs} disabled={selectedJobs.length === 0}>
          Archive
        </button>
        <Link to="/createjob">Add Job</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Location</th>
            <th>Requirements</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job) => (
            <tr key={job.job_id}>
              <td>
                <Link to={`/job/${job.job_id}`}>{job.job_id}</Link>
              </td>
              <td>{job.job_title}</td>
              <td>{job.description}</td>
              <td>{job.location}</td>
              <td>{job.requirements}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedJobs.includes(job.job_id)}
                  onChange={() => handleJobSelection(job.job_id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Jobs;


