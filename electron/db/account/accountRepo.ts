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
  const all = await repository.find({ relations: ["balances", "entries"] });

  return all;
}

export async function get(id: number) {
  const repository = await getRepository();
  const entity = await repository.findOne({ id }, { relations: ["balances", "entries"] });

  return entity;
}

export async function remove(id: number) {
  const repository = await getRepository();
  await repository.delete({ id });
}
