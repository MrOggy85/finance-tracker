import Category from './Category';
import getConnection from '../getConnection';

type SystemCategory = 'Transfer';
export type TransferCategoryName = Extract<SystemCategory, 'Transfer'>;

const systemCategoryIdRecord: Record<SystemCategory, number> = {
  Transfer: -1,
};

async function init() {
  const repository = await getRepository();

  const transferCategoryName: TransferCategoryName = 'Transfer';

  const transferCategory = await repository.findOne({ name: transferCategoryName });
  if (!transferCategory) {
    const addedTransferCategory = await add({
      name: transferCategoryName,
    });
    systemCategoryIdRecord.Transfer = addedTransferCategory.id;
  } else {
    systemCategoryIdRecord.Transfer = transferCategory.id;
  }
}
init().then(() => {
  console.log('systemCategoryIdRecord', systemCategoryIdRecord);
});



export function getCategoryId(categoryType: SystemCategory) {
  const id = systemCategoryIdRecord[categoryType];
  return id;
}

async function getRepository() {
  const connection = await getConnection();
  const repository = connection.getRepository(Category);
  return repository;
}

type CategoryAdd = Omit<Category, 'id' | 'entries'>;

export async function add(newCategory: CategoryAdd) {
  const entity = new Category();
  entity.name = newCategory.name;

  const repository = await getRepository();
  return await repository.save(entity);
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

export async function get(id: number): Promise<Category | undefined> {
  const repository = await getRepository();
  const entity = await repository.findOne({ id }, { relations: ["entries"] });
  return entity;
}

export async function remove(id: Category['id']) {
  const repository = await getRepository();
  await repository.delete({ id });
}
