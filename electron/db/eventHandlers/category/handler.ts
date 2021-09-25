import * as categoryRepo from "../../category/repo";
import type { Param } from "../types";
import type { Add, Update, Remove } from './types';

async function handler({ operation, arg }: Omit<Param, 'entity'>) {
  switch (operation) {
    case 'getall':
      const categories = await categoryRepo.getAll();
      return categories;

    case 'add':
      await categoryRepo.add(arg as Add['arg']);
      return;

    case 'update':
      await categoryRepo.update(arg as Update['arg']);
      return;

    case 'remove':
      await categoryRepo.remove(arg as Remove['arg']);
      return;

    default:
      break;
  }
}

export default handler;
