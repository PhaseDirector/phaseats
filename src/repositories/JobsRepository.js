const { EntityRepository, Repository } = require('typeorm');
const Jobsent = require('../entities/Jobsent');

@EntityRepository(Jobsent)
class JobsRepository extends Repository {
  // Create a new job
  async create(jobData) {
    const job = this.create(jobData);
    await this.save(job);
    return job;
  }

  // Get a job by ID
  async findById(jobId) {
    const job = await this.findOne(jobId);
    return job;
  }

  // Get all jobs
  async findAll() {
    const jobs = await this.find();
    return jobs;
  }

  // Update a job
  async update(jobId, jobData) {
    const job = await this.findOne(jobId);
    if (!job) {
      throw new Error('Job not found');
    }
    Object.assign(job, jobData);
    await this.save(job);
    return job;
  }

  // Delete a job
  async delete(jobId) {
    const job = await this.findOne(jobId);
    if (!job) {
      throw new Error('Job not found');
    }
    await this.remove(job);
  }
}

module.exports = JobsRepository;

