import * as accountRepo from "./account/accountRepo";
import * as categoryRepo from "./category/categoryRepo";
import { add as addBalance } from "./balance/balanceRepo";
import { add as addEntry } from "./entry/entryRepo";

type AccountGetAll = {
  entity: 'account';
  operation: 'getall';
  arg?: never;
};

type AccountGet = {
  entity: 'account';
  operation: 'get';
  arg: Parameters<typeof accountRepo['get']>[0];
};

type AccountAdd = {
  entity: 'account';
  operation: 'add';
  arg: Parameters<typeof accountRepo['add']>[0];
};

type AccountAddBalance = {
  entity: 'account';
  operation: 'add-balance';
  arg: Parameters<typeof addBalance>;
};

type AccountAddEntry = {
  entity: 'account';
  operation: 'add-entry';
  arg: Parameters<typeof addEntry>;
};

type AccountRemove = {
  entity: 'account';
  operation: 'remove';
  arg: Parameters<typeof accountRepo['remove']>[0];
};

type CategoryGetAll = {
  entity: 'category';
  operation: 'getall';
  arg?: never;
};

type CategoryAdd = {
  entity: 'category';
  operation: 'add';
  arg: Parameters<typeof categoryRepo['add']>[0];
};

type CategoryUpdate = {
  entity: 'category';
  operation: 'update';
  arg: Parameters<typeof categoryRepo['update']>[0];
};

type CategoryRemove = {
  entity: 'category';
  operation: 'remove';
  arg: Parameters<typeof categoryRepo['remove']>[0];
};

export type Param = AccountGetAll | AccountGet | AccountAdd | AccountAddBalance | AccountAddEntry | AccountRemove | CategoryGetAll | CategoryAdd | CategoryRemove | CategoryUpdate;

async function repo({ entity, operation, arg }: Param) {
  switch (entity) {
    case 'account':
      return accountHandler({ operation, arg });
    case 'category':
      return categoryHandler({ operation, arg });

    default:
      throw Error(`Unknown Entity: ${entity}`);
  }
}

async function accountHandler({ operation, arg }: Omit<Param, 'entity'>) {
  switch (operation) {
    case 'getall':
      const accounts = await accountRepo.getAll();
      return accounts;

    case 'get':
      const account = await accountRepo.get(arg as AccountGet['arg']);
      return account;

    case 'add':
      await accountRepo.add(arg as AccountAdd['arg']);
      return;

    case 'add-balance':
      await addBalance(...arg as AccountAddBalance['arg']);
      return;

    case 'add-entry':
      await addEntry(...arg as AccountAddEntry['arg']);
      return;

    case 'remove':
      await accountRepo.remove(arg as AccountRemove['arg']);
      return;

    default:
      break;
  }
}

async function categoryHandler({ operation, arg }: Omit<Param, 'entity'>) {
  switch (operation) {
    case 'getall':
      const categories = await categoryRepo.getAll();
      return categories;

    case 'add':
      await categoryRepo.add(arg as CategoryAdd['arg']);
      return;

    case 'update':
      await categoryRepo.update(arg as CategoryUpdate['arg']);
      return;

    case 'remove':
      await categoryRepo.remove(arg as CategoryRemove['arg']);
      return;

    default:
      break;
  }
}

export default repo;
