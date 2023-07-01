import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroupDetails = (props) => {
  const [group, setGroup] = useState(null);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const groupId = props.match.params.id; // Extract the group ID from the URL
        const groupResponse = await axios.get(`http://localhost:8000/api/groups/${groupId}`);
        setGroup(groupResponse.data);

        const candidatesResponse = await axios.get(`http://localhost:8000/api/groups/${groupId}/candidates`);
        setCandidates(candidatesResponse.data);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchGroupDetails();
  }, [props.match.params.id]);

  if (!group || candidates.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Group Details</h2>
      <table>
        <tbody>
          <tr>
            <th>Group ID</th>
            <td>{group.id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{group.name}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{group.description}</td>
          </tr>
        </tbody>
      </table>

      <h3>Candidates in this Group</h3>
      <table>
        <thead>
          <tr>
            <th>Candidate ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            {/* Add more columns for candidate details */}
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.candidate_id}>
              <td>{candidate.candidate_id}</td>
              <td>{candidate.first_name}</td>
              <td>{candidate.last_name}</td>
              {/* Render more columns for candidate details */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupDetails;

