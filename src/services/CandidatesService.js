const CandidatesRepository = require('../repositories/CandidatesRepository');

class CandidatesService {
  constructor() {
    this.candidatesRepository = new CandidatesRepository();
  }

  // Add service methods here
}

module.exports = CandidatesService;
