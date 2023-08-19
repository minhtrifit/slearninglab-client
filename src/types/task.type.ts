export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  username?: string;
  columnId: Id;
  content: string;
};
