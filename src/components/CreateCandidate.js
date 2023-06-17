import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateCandidate = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [type, setType] = useState('');
  const history = useHistory();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleCreateCandidate = () => {
    // Save candidate details and perform necessary actions
    // For now, let's just navigate back to the Candidates page
    history.push('/candidates');
  };

  return (
    <div>
      <h2>Create Candidate</h2>
      <form>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" value={lastName} onChange={handleLastNameChange} />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" value={address} onChange={handleAddressChange} />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" value={phone} onChange={handlePhoneChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea id="notes" value={notes} onChange={handleNotesChange} />
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <select id="type" value={type} onChange={handleTypeChange}>
            <option value="">Select Type</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Manager">Manager</option>
            <option value="Business Analyst">Business Analyst</option>
            <option value="Developer">Developer</option>
            <option value="Tester">Tester</option>
            <option value="CRM/ERP">CRM/ERP</option>
          </select>
        </div>
        <button type="button" onClick={handleCreateCandidate}>Create Candidate</button>
      </form>
    </div>
  );
};

export default CreateCandidate;
