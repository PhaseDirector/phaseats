import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Candidatesent {
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
