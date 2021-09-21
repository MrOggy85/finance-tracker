import Category from './Category';
import getConnection from '../getConnection';

async function getRepository() {
  const connection = await getConnection();
  const repository = connection.getRepository(Category);
  return repository;
}

type CategoryAdd = Omit<Category, 'id' | 'entries'>;

export async function add(newCategory: CategoryAdd) {
  const entry = new Category();
  entry.name = newCategory.name;

  const repository = await getRepository();
  await repository.save(entry);
}

type CategoryUpdate = Omit<Category, 'entries'>;

export async function update(changedCategory: CategoryUpdate) {
  const entity = await get(changedCategory.id);
  entity.name = changedCategory.name;

  const repository = await getRepository();
  await repository.save(entity);
}

export async function getAll() {
  const repository = await getRepository();
  const all = await repository.find();

  return all;
}

export async function get(id: number) {
  const repository = await getRepository();
  const entity = await repository.findOne({ id }, { relations: ["entries"] });

  return entity;
}

export async function remove(id: Category['id']) {
  const repository = await getRepository();
  await repository.delete({ id });
}
