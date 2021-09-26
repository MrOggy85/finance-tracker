import * as entryRepo from "../../entry/repo";
import type { Param } from "../types";
import type { Add, Remove, AddTransfer } from './types';

async function handler({ operation, arg }: Omit<Param, 'entity'>) {
  switch (operation) {
    case 'add':
      await entryRepo.add(arg as Add['arg']);
      return;

    case 'add-transfer':
      await entryRepo.addTransfer(arg as AddTransfer['arg']);
      return;

    case 'remove':
      await entryRepo.remove(arg as Remove['arg']);
      return;

    default:
      break;
  }
}

export default handler;
