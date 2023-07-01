const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity()
class Groupent {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  name;

  @Column()
  description;

  @Column()
  createdAt;

  @Column()
  updatedAt;
}

module.exports = {
  Group,
};
