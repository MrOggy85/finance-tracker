import Balance from './Balance';
import { get as getAccount } from '../account/repo';
import getConnection from '../getConnection';
import Account from '../account/Account';

async function getRepository() {
  const connection = await getConnection();
  const repository = connection.getRepository(Balance);
  return repository;
}

function isSameDate(date1: Date, date2: Date) {
  return date1.getDate() === date2.getDate()
    && date1.getMonth() === date2.getMonth()
    && date1.getFullYear() === date2.getFullYear();
}

export async function add(amount: number, accountId: number, date: Date) {
  const balance = new Balance();
  balance.amount = amount;
  balance.date = date;

  const account = await getAccount(accountId);
  const newBalances = account.balances.filter(x => !isSameDate(balance.date, x.date));
  account.balances = [...newBalances, balance];

  const repository = await getRepository();
  await repository.save(balance);

  const connection = await getConnection();
  const accountRepository = connection.getRepository(Account);
  await accountRepository.save(account);
}

export async function getAll() {
  const repository = await getRepository();
  const all = await repository.find();

  return all;
}

export async function remove(id: number) {
  const repository = await getRepository();
  await repository.delete({ id });
}
