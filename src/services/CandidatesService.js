const CandidatesRepository = require('../repositories/CandidatesRepository');

class CandidatesService {
  constructor() {
    this.candidatesRepository = new CandidatesRepository();
  }

  async createCandidate(candidateData) {
    return await this.candidatesRepository.create(candidateData);
  }

  async getCandidateById(candidateId) {
    return await this.candidatesRepository.findById(candidateId);
  }

  async getAllCandidates() {
    return await this.candidatesRepository.findAll();
  }

  async updateCandidate(candidateId, candidateData) {
    return await this.candidatesRepository.update(candidateId, candidateData);
  }

  async deleteCandidate(candidateId) {
    return await this.candidatesRepository.delete(candidateId);
  }
}

module.exports = CandidatesService;

