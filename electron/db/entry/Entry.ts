import Account from "../account/Account";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export default class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column("datetime")
  date: Date;

  @Column()
  description: string;

  @ManyToOne(() => Account, account => account.entires, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  account: Account;
}
