import Account from './Account';
import getConnection from '../getConnection';

async function getRepository() {
  const connection = await getConnection();
  const repository = connection.getRepository(Account);
  return repository;
}

export async function add(name: string) {
  const account = new Account();
  account.name = name;

  const repository = await getRepository();
  await repository.save(account);
}

export async function getAll() {
  const repository = await getRepository();
  const all = await repository.find({ relations: ["balances"] });

  return all;
}

export async function get(id: number) {
  const repository = await getRepository();
  const account = await repository.findOne({ id }, { relations: ["balances"] });

  return account;
}

export async function remove(id: number) {
  const repository = await getRepository();
  await repository.delete({ id });
}
