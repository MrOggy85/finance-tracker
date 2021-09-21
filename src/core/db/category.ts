import type Category from '../../../electron/db/category/Category';
import send from './send';

export function getAll() {
  return send<Category[]>({
    entity: 'category',
    operation: 'getall'
  });
}

export function add(name: string) {
  return send({
    entity: 'category',
    operation: 'add',
    arg: { name },
  });
}

export function update(id: number, name: string) {
  return send({
    entity: 'category',
    operation: 'update',
    arg: { name, id },
  });
}

export function remove(id: number) {
  return send({
    entity: 'category',
    operation: 'remove',
    arg: id,
  });
}
