import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAll as getAllAccounts } from '../db/account';
import { remove as removeEntryFromDb, add as addEntryFromDb, addTransfer as addTransferFromDb } from '../db/entry';

export type Account = {
  id: number;
  name: string;
  entries: Entry[];
};

export type Entry = {
  id: number;
  amount: number;
  date: number;
  description: string;
  category: Category;
};

export type Category = {
  id: number;
  name: string;
};

const NAMESPACE = 'account';

export const getAll = createAsyncThunk<
  Account[],
  void,
  {}
>(
  `${NAMESPACE}/getAll`,
  async (_, _thunkApi) => {
    const accountEntities = await getAllAccounts();

    const accounts: Account[] = accountEntities.map(x => {
      return {
        id: x.id,
        name: x.name,
        entries: x.entries.map<Entry>(e => {
          return {
            id: e.id,
            amount: e.amount,
            date: e.date.getTime(),
            description: e.description,
            category: {
              id: e.category.id,
              name: e.category.name,
            },
          };
        })
      };
    });

    return accounts;
  },
);

type EntryAdd = Parameters<typeof addEntryFromDb>[0];
export const addEntry = createAsyncThunk<
  boolean,
  EntryAdd,
  {}
>(
  `${NAMESPACE}/addEntry`,
  async (entryToAdd, thunkApi) => {
    await addEntryFromDb(entryToAdd);

    await thunkApi.dispatch(getAll());
    return true;
  },
);

type TransferAdd = Parameters<typeof addTransferFromDb>[0] & {
  sourceAccountId: Parameters<typeof addTransferFromDb>[1];
  destinationAccountId: Parameters<typeof addTransferFromDb>[2];
};
export const addTransfer = createAsyncThunk<
  boolean,
  TransferAdd,
  {}
>(
  `${NAMESPACE}/addTransfer`,
  async (transferAdd, thunkApi) => {
    await addTransferFromDb({
      amount: transferAdd.amount,
      date: transferAdd.date,
      description: transferAdd.description,
    }, transferAdd.destinationAccountId, transferAdd.destinationAccountId);

    await thunkApi.dispatch(getAll());
    return true;
  },
);

export const removeEntry = createAsyncThunk<
  boolean,
  Account['entries'][0]['id'],
  {}
>(
  `${NAMESPACE}/removeEntry`,
  async (id, thunkApi) => {
    await removeEntryFromDb(id);

    await thunkApi.dispatch(getAll());
    return true;
  },
);


const accountSlice = createSlice({
  name: NAMESPACE,
  initialState: {
    accounts: [] as Account[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.accounts = action.payload;
    });
  },
});

export default accountSlice;
