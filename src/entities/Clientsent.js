const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity()
class Clientsent {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  clientName;

  @Column()
  address;

  @Column()
  website;

  @Column()
  notes;
}

module.exports = {
  Clientsent,
};

