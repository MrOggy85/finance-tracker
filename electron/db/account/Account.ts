import Entry from "../entry/Entry";
import Balance from "../balance/Balance";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export default class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Balance, balance => balance.account)
  balances: Balance[];

  @OneToMany(() => Entry, entry => entry.account)
  entires: Entry[];
}
