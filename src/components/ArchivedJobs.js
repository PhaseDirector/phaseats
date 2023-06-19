import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArchivedJobs = () => {
  const [archivedJobs, setArchivedJobs] = useState([]);

  useEffect(() => {
    const fetchArchivedJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/archivedjobs');
        setArchivedJobs(response.data);
      } catch (error) {
        console.error('Error fetching archived jobs:', error);
      }
    };

    fetchArchivedJobs();
  }, []);

  return (
    <div>
      <h2>Archived Jobs</h2>
      <table>
        {/* Display archived jobs data */}
      </table>
    </div>
  );
};

export default ArchivedJobs;
