const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity()
class Candidatesent {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  firstName;

  @Column()
  lastName;

  @Column()
  address;

  @Column()
  phone;

  @Column()
  email;

  @Column()
  notes;

  @Column()
  type;
}

module.exports = {
  Candidatesent,
};
