import Entry from './Entry';
import * as accountRepo from '../account/repo';
import * as categoryRepo from '../category/repo';
import getConnection from '../getConnection';
import type Account from '../account/Account';
import type Category from '../category/Category';
import isSameDate from '../helpers/isSameDate';

async function getRepository() {
  const connection = await getConnection();
  const repository = connection.getRepository(Entry);
  return repository;
}

type EntryAdd = Omit<Entry, 'id' | 'account' | 'category'>;

export async function add(newEntry: EntryAdd, accountId: Account['id'], categoryId: Category['id']) {
  const entry = new Entry();
  entry.amount = newEntry.amount;
  entry.date = newEntry.date;
  entry.description = newEntry.description;

  // 1. Save Category
  const category = await categoryRepo.get(categoryId);
  entry.category = category;

  // 2. Save Entry
  const repository = await getRepository();
  await repository.save(entry);

  // 3. Save Account & relation
  const account = await accountRepo.get(accountId);
  const newEntires = account.entries.filter(x => !isSameDate(entry.date, x.date));
  account.entries = [...newEntires, entry];
  accountRepo.save(account);
}

export async function getAll() {
  const repository = await getRepository();
  const all = await repository.find();
  return all;
}

export async function remove(id: Entry['id']) {
  const repository = await getRepository();
  await repository.delete({ id });
}
