import * as accountRepo from "../../account/accountRepo";
import * as balanceRepo from "../../balance/balanceRepo";
import * as entryRepo from "../../entry/entryRepo";

export type GetAll = {
  entity: 'account';
  operation: 'getall';
  arg?: never;
};

export type Get = {
  entity: 'account';
  operation: 'get';
  arg: Parameters<typeof accountRepo['get']>[0];
};

export type Add = {
  entity: 'account';
  operation: 'add';
  arg: Parameters<typeof accountRepo['add']>[0];
};

export type AddBalance = {
  entity: 'account';
  operation: 'add-balance';
  arg: Parameters<typeof balanceRepo.add>;
};

export type AddEntry = {
  entity: 'account';
  operation: 'add-entry';
  arg: Parameters<typeof entryRepo.add>;
};

export type RemoveEntry = {
  entity: 'account';
  operation: 'remove-entry';
  arg: Parameters<typeof entryRepo.remove>[0];
};

export type Remove = {
  entity: 'account';
  operation: 'remove';
  arg: Parameters<typeof accountRepo['remove']>[0];
};

type Account = GetAll | Get | Add | AddBalance | AddEntry | RemoveEntry | Remove;
export default Account;
