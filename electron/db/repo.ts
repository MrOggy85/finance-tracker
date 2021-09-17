import { getAll, add, remove } from "./account/accountRepo";
import { add as addBalance } from "./balance/balanceRepo";

type AccountGetAll = {
  // entity: 'account';
  operation: 'getall';
  arg?: never;
};

type AccountAdd = {
  // entity: 'account';
  operation: 'add';
  arg: Parameters<typeof add>[0];
};

type AccountAddBalance = {
  // entity: 'account';
  operation: 'add-balance';
  arg: Parameters<typeof addBalance>;
};

type AccountRemove = {
  // entity: 'account';
  operation: 'remove';
  arg: Parameters<typeof remove>[0];
};

export type Param = AccountGetAll | AccountAdd | AccountAddBalance | AccountRemove;

async function repo({ operation, arg }: Param) {
  switch (operation) {
    case 'getall':
      const accounts = await getAll();
      return accounts;

    case 'add':
      await add(arg as AccountAdd['arg']);
      return;

    case 'add-balance':
      await addBalance(...arg as AccountAddBalance['arg']);
      return;

    case 'remove':
      await remove(arg as AccountRemove['arg']);
      return;

    default:
      break;
  }
}

export default repo;
