const { EntityRepository, Repository } = require('typeorm');
const Jobsent = require('../entities/Jobsent');

@EntityRepository(Jobsent)
class JobsRepository extends Repository {
  // Add custom repository methods here
}

module.exports = JobsRepository;
