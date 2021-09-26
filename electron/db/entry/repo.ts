import Entry from './Entry';
import * as categoryRepo from '../category/repo';
import getConnection from '../getConnection';
import type Account from '../account/Account';

async function getRepository() {
  const connection = await getConnection();
  const repository = connection.getRepository(Entry);
  return repository;
}

type EntryAdd = Omit<Entry, 'id' | 'account' | 'category'>;

export async function add(newEntry: EntryAdd) {
  const entry = new Entry();
  entry.amount = -newEntry.amount;
  entry.date = newEntry.date;
  entry.description = newEntry.description;
  entry.accountId = newEntry.accountId;
  entry.categoryId = newEntry.categoryId;

  await save(entry);
}

type AddTransfer = {
  newEntry: Omit<EntryAdd, 'accountId' | 'categoryId'>;
  sourceAccountId: Account['id'];
  destinationAccountId: Account['id'];
};

export async function addTransfer({ newEntry, sourceAccountId, destinationAccountId }: AddTransfer) {
  const sourceEntry = new Entry();
  sourceEntry.amount = -newEntry.amount;
  sourceEntry.date = newEntry.date;
  sourceEntry.description = newEntry.description;
  sourceEntry.accountId = sourceAccountId;

  const destinationEntry = new Entry();
  destinationEntry.amount = newEntry.amount;
  destinationEntry.date = newEntry.date;
  destinationEntry.description = newEntry.description;
  destinationEntry.accountId = destinationAccountId;

  sourceEntry.categoryId = categoryRepo.getCategoryId('Transfer');
  destinationEntry.categoryId = categoryRepo.getCategoryId('Transfer');

  await save(sourceEntry);
  await save(destinationEntry);
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

async function save(entry: Entry) {
  const repository = await getRepository();
  await repository.save(entry);
}
