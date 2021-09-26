import * as entryRepo from "../../entry/repo";

export type Add = {
  entity: 'entry';
  operation: 'add';
  arg: Parameters<typeof entryRepo.add>[0];
};

export type Remove = {
  entity: 'entry';
  operation: 'remove';
  arg: Parameters<typeof entryRepo.remove>[0];
};

export type AddTransfer = {
  entity: 'entry';
  operation: 'add-transfer';
  arg: Parameters<typeof entryRepo.addTransfer>[0];
};

type Entry = Add | Remove | AddTransfer;
export default Entry;
