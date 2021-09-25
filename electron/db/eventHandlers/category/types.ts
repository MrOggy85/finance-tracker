import * as categoryRepo from "../../category/categoryRepo";

export type GetAll = {
  entity: 'category';
  operation: 'getall';
  arg?: never;
};

export type Add = {
  entity: 'category';
  operation: 'add';
  arg: Parameters<typeof categoryRepo['add']>[0];
};

export type Update = {
  entity: 'category';
  operation: 'update';
  arg: Parameters<typeof categoryRepo['update']>[0];
};

export type Remove = {
  entity: 'category';
  operation: 'remove';
  arg: Parameters<typeof categoryRepo['remove']>[0];
};

type Category = GetAll | Add | Update | Remove;
export default Category;
