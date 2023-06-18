const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity()
class Jobsent {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  jobTitle;

  @Column()
  description;

  @Column()
  location;

  @Column()
  requirements;
}

module.exports = {
  Jobsent,
};

