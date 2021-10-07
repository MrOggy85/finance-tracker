import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAll as getAllFromDb, add as addFromDb, update as updateFromDb, remove as removeFromDb } from '../db/category';
import type { Category } from './types';

export const NAMESPACE = 'category';

export const getAll = createAsyncThunk<
  Category[],
  void,
  {}
>(
  `${NAMESPACE}/getAll`,
  async (_, _thunkApi) => {
    const entities = await getAllFromDb();
    const categories: Category[] = entities.map(x => {
      return {
        id: x.id,
        name: x.name,
      };
    }).sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });

    return categories;
  },
);

type CategoryAdd = Parameters<typeof addFromDb>[0];
export const add = createAsyncThunk<
  boolean,
  CategoryAdd,
  {}
>(
  `${NAMESPACE}/add`,
  async (entryToAdd, thunkApi) => {
    await addFromDb(entryToAdd);

    await thunkApi.dispatch(getAll());
    return true;
  },
);

type CategoryUpdate = Parameters<typeof updateFromDb>;
export const update = createAsyncThunk<
  boolean,
  CategoryUpdate,
  {}
>(
  `${NAMESPACE}/update`,
  async (categoryToUpdate, thunkApi) => {
    await updateFromDb(...categoryToUpdate);

    await thunkApi.dispatch(getAll());
    return true;
  },
);

export const remove = createAsyncThunk<
  boolean,
  Category['id'],
  {}
>(
  `${NAMESPACE}/remove`,
  async (id, thunkApi) => {
    await removeFromDb(id);

    await thunkApi.dispatch(getAll());
    return true;
  },
);


const categorySlice = createSlice({
  name: NAMESPACE,
  initialState: {
    categories: [] as Category[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.categories = action.payload;
    });

    builder.addCase(remove.rejected, (state, action) => {
      alert(`Remove failed ${action.error.message}`);
    });
  },
});

export default categorySlice;
