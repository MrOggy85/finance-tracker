export type Account = {
  id: number;
  name: string;
  entries: Entry[];
  balance: number;
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
