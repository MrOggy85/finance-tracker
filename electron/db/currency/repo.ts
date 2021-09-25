import { Currency, CurrencyValue } from './Currency';
import getConnection from '../getConnection';

async function getRepository() {
  const connection = await getConnection();
  const repository = connection.getRepository(Currency);
  return repository;
}

async function getCurrencyValueRepository() {
  const connection = await getConnection();
  const repository = connection.getRepository(CurrencyValue);
  return repository;
}

export async function add(name: string) {
  const currency = new Currency();
  currency.name = name;

  const repository = await getRepository();
  await repository.save(currency);
}

type CurrencyValueAdd = Omit<CurrencyValue, 'id' | 'currency'>;

export async function addCurrencyValuation(newCurrencyValue: CurrencyValueAdd, currencyId: Currency['id']) {
  const currencyValue = new CurrencyValue();
  currencyValue.amount = newCurrencyValue.amount;
  currencyValue.date = newCurrencyValue.date;

  const currency = await get(currencyId);
  currencyValue.currency = currency;

  const currencyValueRepository = await getCurrencyValueRepository();
  await currencyValueRepository.save(currencyValue);
}

export async function getAll() {
  const repository = await getRepository();
  const all = await repository.find({ relations: ["currencyValue"] });

  return all;
}

export async function get(id: number) {
  const repository = await getRepository();
  const currency = await repository.findOne({ id }, { relations: ["currencyValue"] });

  return currency;
}

export async function remove(id: number) {
  const repository = await getRepository();
  await repository.delete({ id });
}
