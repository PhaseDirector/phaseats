const JobsRepository = require('../repositories/JobsRepository');

class JobsService {
  constructor() {
    this.jobsRepository = new JobsRepository();
  }

  // Add service methods here
}

module.exports = JobsService;
