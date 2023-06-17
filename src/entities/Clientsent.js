import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Clientsent {
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
