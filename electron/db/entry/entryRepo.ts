import Entry from './Entry';
import { get as getAccount } from '../account/accountRepo';
import getConnection from '../getConnection';
import Account from '../account/Account';

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

type EntryAdd = Omit<Entry, 'id' | 'account'>;

export async function add(newEntry: EntryAdd, accountId: Account['id']) {
  const entry = new Entry();
  entry.amount = newEntry.amount;
  entry.date = newEntry.date;
  entry.description = newEntry.description;

  const account = await getAccount(accountId);
  const newEntires = account.entires.filter(x => !isSameDate(entry.date, x.date));
  account.entires = [...newEntires, entry];

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
