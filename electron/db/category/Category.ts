import Entry from "../entry/Entry";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export default class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @OneToMany(() => Entry, entry => entry.category)
  entries: Entry[];
}
