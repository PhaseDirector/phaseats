const { EntityRepository, Repository } = require('typeorm');
const Candidatesent = require('../entities/Candidatesent');

@EntityRepository(Candidatesent)
class CandidatesRepository extends Repository {
  // Create a new candidate
  async create(candidateData) {
    const candidate = this.create(candidateData);
    await this.save(candidate);
    return candidate;
  }

  // Get a candidate by ID
  async findById(candidateId) {
    const candidate = await this.findOne(candidateId);
    return candidate;
  }

  // Get all candidates
  async findAll() {
    const candidates = await this.find();
    return candidates;
  }

  // Update a candidate
  async update(candidateId, candidateData) {
    const candidate = await this.findOne(candidateId);
    if (!candidate) {
      throw new Error('Candidate not found');
    }
    Object.assign(candidate, candidateData);
    await this.save(candidate);
    return candidate;
  }

  // Delete a candidate
  async delete(candidateId) {
    const candidate = await this.findOne(candidateId);
    if (!candidate) {
      throw new Error('Candidate not found');
    }
    await this.remove(candidate);
  }
}

module.exports = CandidatesRepository;

