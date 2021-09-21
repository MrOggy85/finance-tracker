import type Account from '../../../electron/db/account/Account';
import send from './send';

type Entry = Account['entries'][0];

export function getAll() {
  return send<Account[]>({
    entity: 'account',
    operation: 'getall'
  });
}

export function get(id: number) {
  return send<Account[]>({
    entity: 'account',
    operation: 'get',
    arg: id,
  });
}

export function add(name: string) {
  return send({
    entity: 'account',
    operation: 'add',
    arg: name,
  });
}

export function addBalance(amount: number, accountId: number, date: Date) {
  return send({
    entity: 'account',
    operation: 'add-balance',
    arg: [amount, accountId, date],
  });
}

type EntryAdd = Omit<Entry, 'id' | 'account' | 'category'>;

export function addEntry(entry: EntryAdd, accountId: number, categoryId: number) {
  return send({
    entity: 'account',
    operation: 'add-entry',
    arg: [entry, accountId, categoryId],
  });
}

export function remove(id: number) {
  return send({
    entity: 'account',
    operation: 'remove',
    arg: id,
  });
}
