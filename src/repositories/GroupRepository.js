const { EntityRepository, Repository } = require('typeorm');
const Groupent = require('../entities/Groupent');

@EntityRepository(Groupent)
class GroupRepository extends Repository {
  // Create a new group
  async create(groupData) {
    const group = this.create(groupData);
    await this.save(group);
    return group;
  }

  // Get a group by ID
  async findById(groupId) {
    const group = await this.findOne(groupId);
    return group;
  }

  // Get all groups
  async findAll() {
    const groups = await this.find();
    return groups;
  }

  // Update a group
  async update(groupId, groupData) {
    const group = await this.findOne(groupId);
    if (!group) {
      throw new Error('Group not found');
    }
    Object.assign(group, groupData);
    await this.save(group);
    return group;
  }

  // Delete a group
  async delete(groupId) {
    const group = await this.findOne(groupId);
    if (!group) {
      throw new Error('Group not found');
    }
    await this.remove(group);
  }
}

module.exports = GroupRepository;
