import accountSlice from './accountSlice';
import categorySlice, { NAMESPACE as CATEGORY_NAMESPACE } from './categorySlice';

const rootReducer = {
  accounts: accountSlice.reducer,
  [CATEGORY_NAMESPACE]: categorySlice.reducer,
};

export default rootReducer;
