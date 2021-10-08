import store from './redux/store';
import { getAll as getAllAccounts } from './redux/accountSlice';
import { getAll as getAllCategories } from './redux/categorySlice';

async function onStartup() {
  await store.dispatch(getAllAccounts());
  await store.dispatch(getAllCategories());
}

export default onStartup;
