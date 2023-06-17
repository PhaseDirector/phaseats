const ClientsRepository = require('../repositories/ClientsRepository');

class ClientsService {
  constructor() {
    this.clientsRepository = new ClientsRepository();
  }

  async createClient(clientData) {
    return await this.clientsRepository.create(clientData);
  }

  async getClientById(clientId) {
    return await this.clientsRepository.findById(clientId);
  }

  async getAllClients() {
    return await this.clientsRepository.findAll();
  }

  async updateClient(clientId, clientData) {
    return await this.clientsRepository.update(clientId, clientData);
  }

  async deleteClient(clientId) {
    return await this.clientsRepository.delete(clientId);
  }
}

module.exports = ClientsService;

