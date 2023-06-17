import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Candidates from './components/Candidates';
import Clients from './components/Clients';
import Jobs from './components/Jobs';
import CreateCandidate from './components/CreateCandidate';
import CreateClient from './components/CreateClient';
import CreateJob from './components/CreateJob';
import CandidateDetails from './components/CandidateDetails';
import ClientDetails from './components/ClientDetails';
import JobDetails from './components/JobDetails';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/candidates" component={Candidates} />
        <Route exact path="/clients" component={Clients} />
        <Route exact path="/jobs" component={Jobs} />
        <Route exact path="/createcan" component={CreateCandidate} />
        <Route exact path="/createcli" component={CreateClient} />
        <Route exact path="/createjob" component={CreateJob} />
        <Route exact path="/candidate/:id" component={CandidateDetails} />
        <Route exact path="/client/:id" component={ClientDetails} />
        <Route exact path="/job/:id" component={JobDetails} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
export default App;