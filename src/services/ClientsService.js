const ClientsRepository = require('../repositories/ClientsRepository');

class ClientsService {
  constructor() {
    this.clientsRepository = new ClientsRepository();
  }

  // Add service methods here
}

module.exports = ClientsService;
