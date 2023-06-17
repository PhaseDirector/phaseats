const { EntityRepository, Repository } = require('typeorm');
const Clientsent = require('../entities/Clientsent');

@EntityRepository(Clientsent)
class ClientsRepository extends Repository {
  // Create a new client
  async create(clientData) {
    const client = this.create(clientData);
    await this.save(client);
    return client;
  }

  // Get a client by ID
  async findById(clientId) {
    const client = await this.findOne(clientId);
    return client;
  }

  // Get all clients
  async findAll() {
    const clients = await this.find();
    return clients;
  }

  // Update a client
  async update(clientId, clientData) {
    const client = await this.findOne(clientId);
    if (!client) {
      throw new Error('Client not found');
    }
    Object.assign(client, clientData);
    await this.save(client);
    return client;
  }

  // Delete a client
  async delete(clientId) {
    const client = await this.findOne(clientId);
    if (!client) {
      throw new Error('Client not found');
    }
    await this.remove(client);
  }
}

module.exports = ClientsRepository;

