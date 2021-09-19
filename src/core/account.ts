import type Account from '../../electron/db/account/Account';
import type { Param } from '../../electron/db/repo';

const { ipcRenderer } = window.require('electron');

function send(p: Param) {
  return new Promise<Account[]>((resolve, reject) => {
    ipcRenderer.once('repo-ok', (_: any, arg: any) => {
      ipcRenderer.removeAllListeners('repo-error');
      resolve(arg);
    });
    ipcRenderer.once('repo-error', (_: any, arg: any) => {
      ipcRenderer.removeAllListeners('repo-ok');
      reject(arg);
    });
    ipcRenderer.send('repo', p);
  });
}

export function getAll() {
  return send({
    // entity: 'account',
    operation: 'getall'
  });
}

export function add(name: string) {
  return send({
    // entity: 'account',
    operation: 'add',
    arg: name,
  });
}

export function addBalance(amount: number, accountId: number, date: Date) {
  return send({
    // entity: 'account',
    operation: 'add-balance',
    arg: [amount, accountId, date],
  });
}

export function remove(id: number) {
  return send({
    // entity: 'account',
    operation: 'remove',
    arg: id,
  });
}
