import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Jobsent {
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
