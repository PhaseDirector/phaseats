// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Candidates from './components/Candidates';
import Clients from './components/Clients';
import Files from './components/Files';
import Jobs from './components/Jobs';
import CreateClient from './components/CreateClient';
import CreateCandidate from './components/CreateCandidate';
import SearchTab from './components/SearchTab';
import CreateJob from './components/CreateJob';
import ArchivedJobs from './components/ArchivedJobs';
import JobDetails from './components/JobDetails';
import Groups from './components/Groups';
import CreateGroup from './components/CreateGroup';
import CandidateGroups from './components/CandidateGroups';


function App() {
  return (
    <Router>
      <div className="App">
        <h1 style={{ textAlign: 'center' }}>Phase ATS</h1>

        {/* Navigation Links */}
        <nav style={{ textAlign: 'center' }}>
          <ul style={{ display: 'inline-block', listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              <Link to="/candidates">Candidates</Link>
            </li>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              <Link to="/clients">Clients</Link>
            </li>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              <Link to="/files">Files</Link>
            </li>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              <Link to="/search">Search</Link>
            </li>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              <Link to="/createclient">Create Client</Link>
            </li>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              <Link to="/createcandidate">Create Candidate</Link>
            </li>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              <Link to="/createjob">Create Job</Link>
            </li>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              <Link to="/archivedjobs">Archived Jobs</Link>
            </li>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              <Link to="/groups">Groups</Link>
            </li>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              <Link to="/creategroup">Create Groups</Link>
            </li>
            <li style={{ display: 'inline-block', marginRight: '10px' }}>
              <Link to="/candidategroups">Candidate Groups</Link>
            </li>
          </ul>
        </nav>

        {/* Route Configuration */}
        <Switch>
          <Route exact path="/candidates" component={Candidates} />
          <Route exact path="/clients" component={Clients} />
          <Route exact path="/files" component={Files} />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/search" component={SearchTab} />
          <Route exact path="/createclient" component={CreateClient} />
          <Route exact path="/createcandidate" component={CreateCandidate} />
          <Route exact path="/createjob" component={CreateJob} />
          <Route exact path="/archivedjobs" component={ArchivedJobs} />
          <Route exact path="/jobs/:jobId" component={JobDetails} />
          <Route exact path="/groups" component={Groups} />
          <Route exact path="/creategroup" component={CreateGroup} />
          <Route exact path="/candidategroups" component={CandidateGroups} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
