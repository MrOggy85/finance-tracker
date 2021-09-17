import Balance from './Balance';
import { get as getAccount } from '../account/accountRepo';
import getConnection from '../getConnection';
import Account from '../account/Account';

async function getRepository() {
  const connection = await getConnection();
  const repository = connection.getRepository(Balance);
  return repository;
}

export async function add(amount: number, accountId: number) {
  const balance = new Balance();
  balance.amount = amount;
  balance.date = new Date();

  const account = await getAccount(accountId);

  if (account.balances) {
    account.balances.push(balance);
  } else {
    account.balances = [balance];
  }


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
