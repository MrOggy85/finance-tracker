import type { Account } from '../../electron/db/account/type';
import type { Param } from '../../electron/db/repo';

const { ipcRenderer } = window.require('electron');

function send(p: Param) {
  return new Promise<Account[]>((resolve, reject) => {
    ipcRenderer.once('repo-ok', (_: any, arg: any) => {
      console.log('repo-ok', arg);
      ipcRenderer.removeAllListeners('repo-error');
      resolve(arg);
    });
    ipcRenderer.once('repo-error', (_: any, arg: any) => {
      console.log('repo-error', arg);
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

export function addBalance(amount: number, accountId: number) {
  return send({
    // entity: 'account',
    operation: 'add-balance',
    arg: [amount, accountId],
  });
}

export function remove(id: number) {
  return send({
    // entity: 'account',
    operation: 'remove',
    arg: id,
  });
}

// export function add(name: string) {
//   return new Promise<Account[]>((resolve) => {
//     ipcRenderer.once('account-add-reply', (_: any, arg: any) => {
//       resolve(arg);
//     });
//     ipcRenderer.send('account-add', name);
//   });
// }

// export function addBalance(amount: number, accountId: number) {
//   return new Promise<Account[]>((resolve) => {
//     ipcRenderer.once('account-add-balance-reply', (_: any, arg: any) => {
//       resolve(arg);
//     });
//     ipcRenderer.send('account-add-balance', { amount, accountId });
//   });
// }

// export function remove(id: number) {
//   return new Promise<Account[]>((resolve) => {
//     ipcRenderer.once('account-remove-reply', (_: any, arg: any) => {
//       resolve(arg);
//     });
//     ipcRenderer.send('account-remove', id);
//   });
// }
