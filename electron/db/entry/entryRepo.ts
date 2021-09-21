import Entry from './Entry';
import { get as getAccount } from '../account/accountRepo';
import { get as getCategory } from '../category/categoryRepo';
import getConnection from '../getConnection';
import Account from '../account/Account';
import type Category from '../category/Category';

async function getRepository() {
  const connection = await getConnection();
  const repository = connection.getRepository(Entry);
  return repository;
}

function isSameDate(date1: Date, date2: Date) {
  return date1.getDate() === date2.getDate()
    && date1.getMonth() === date2.getMonth()
    && date1.getFullYear() === date2.getFullYear();
}

type EntryAdd = Omit<Entry, 'id' | 'account' | 'category'>;

export async function add(newEntry: EntryAdd, accountId: Account['id'], categoryId: Category['id']) {
  const entry = new Entry();
  entry.amount = newEntry.amount;
  entry.date = newEntry.date;
  entry.description = newEntry.description;

  const category = await getCategory(categoryId);
  entry.category = category;

  const account = await getAccount(accountId);
  const newEntires = account.entries.filter(x => !isSameDate(entry.date, x.date));
  account.entries = [...newEntires, entry];

  const repository = await getRepository();
  await repository.save(entry);

  const connection = await getConnection();
  const accountRepository = connection.getRepository(Account);
  await accountRepository.save(account);
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
