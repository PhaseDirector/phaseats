const { EntityRepository, Repository } = require('typeorm');
const Clientsent = require('../entities/Clientsent');

@EntityRepository(Clientsent)
class ClientsRepository extends Repository {
  // Add custom repository methods here
}

module.exports = ClientsRepository;
