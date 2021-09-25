import * as accountRepo from "../../account/accountRepo";
import { add as addBalance } from "../../balance/balanceRepo";
import { add as addEntry, remove as removeEntry } from "../../entry/entryRepo";
import type { Param } from "../types";
import type { Add, AddBalance, AddEntry, Get, Remove, RemoveEntry } from './types';

async function accountHandler({ operation, arg }: Omit<Param, 'entity'>) {
  switch (operation) {
    case 'getall':
      const accounts = await accountRepo.getAll();
      return accounts;

    case 'get':
      const account = await accountRepo.get(arg as Get['arg']);
      return account;

    case 'add':
      await accountRepo.add(arg as Add['arg']);
      return;

    case 'add-balance':
      await addBalance(...arg as AddBalance['arg']);
      return;

    case 'add-entry':
      await addEntry(...arg as AddEntry['arg']);
      return;

    case 'remove-entry':
      await removeEntry(arg as RemoveEntry['arg']);
      return;

    case 'remove':
      await accountRepo.remove(arg as Remove['arg']);
      return;

    default:
      break;
  }
}

export default accountHandler;
