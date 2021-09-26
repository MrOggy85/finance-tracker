import Account from "../account/Account";
import Category from "../category/Category";
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

  @ManyToOne(() => Account, account => account.entries, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  account: Account;

  @ManyToOne(() => Category, category => category.entries, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  category: Category;

  @Column({ nullable: false })
  categoryId: number;

  @Column({ nullable: false })
  accountId: number;
}
