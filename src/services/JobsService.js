const JobsRepository = require('../repositories/JobsRepository');

class JobsService {
  constructor() {
    this.jobsRepository = new JobsRepository();
  }

  async createJob(jobData) {
    return await this.jobsRepository.create(jobData);
  }

  async getJobById(jobId) {
    return await this.jobsRepository.findById(jobId);
  }

  async getAllJobs() {
    return await this.jobsRepository.findAll();
  }

  async updateJob(jobId, jobData) {
    return await this.jobsRepository.update(jobId, jobData);
  }

  async deleteJob(jobId) {
    return await this.jobsRepository.delete(jobId);
  }
}

module.exports = JobsService;
