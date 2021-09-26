import type Entry from "../../../electron/db/entry/Entry";
import send from "./send";

type EntryAdd = Omit<Entry, 'id' | 'account' | 'category'>;

export function add(entry: EntryAdd) {
  return send({
    entity: 'entry',
    operation: 'add',
    arg: entry,
  });
}

type TransferAdd = Omit<EntryAdd, 'categoryId' | 'accountId'>;

export function addTransfer(newEntry: TransferAdd, sourceAccountId: number, destinationAccountId: number) {
  return send({
    entity: 'entry',
    operation: 'add-transfer',
    arg: { newEntry, sourceAccountId, destinationAccountId },
  });
}

export function remove(entryId: Entry['id']) {
  return send({
    entity: 'entry',
    operation: 'remove',
    arg: entryId,
  });
}
