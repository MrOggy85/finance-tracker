import accountHandler from './account/handler';
import categoryHandler from './category/handler';
import type { Param } from './types';

async function mainCallback({ entity, operation, arg }: Param) {
  switch (entity) {
    case 'account':
      return accountHandler({ operation, arg });
    case 'category':
      return categoryHandler({ operation, arg });

    default:
      throw Error(`Unknown Entity: ${entity}`);
  }
}

export default mainCallback;
