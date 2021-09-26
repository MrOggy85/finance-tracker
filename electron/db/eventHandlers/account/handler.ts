import * as accountRepo from "../../account/repo";
import { add as addBalance } from "../../balance/repo";
import type { Param } from "../types";
import type { Add, AddBalance, Get, Remove } from './types';

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

    case 'remove':
      await accountRepo.remove(arg as Remove['arg']);
      return;

    default:
      break;
  }
}

export default accountHandler;
