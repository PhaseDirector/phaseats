const { EntityRepository, Repository } = require('typeorm');
const Candidatesent = require('../entities/Candidatesent');

@EntityRepository(Candidatesent)
class CandidatesRepository extends Repository {
  // Add custom repository methods here
}

module.exports = CandidatesRepository;
