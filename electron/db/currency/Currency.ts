import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @OneToMany(() => CurrencyValue, currencyValue => currencyValue.currency)
  values: CurrencyValue[];
}

@Entity()
export class CurrencyValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: "Amount of JPY the currency was worth at the specified date"
  })
  amount: number;

  @Column({
    comment: "The Date of evaluation. Should use the closing valuation"
  })
  date: Date;

  @ManyToOne(() => Currency, currency => currency.values)
  currency: Currency;
}
