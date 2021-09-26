import type Account from '../../../electron/db/account/Account';
import send from './send';

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

export function remove(id: number) {
  return send({
    entity: 'account',
    operation: 'remove',
    arg: id,
  });
}
