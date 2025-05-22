export type Folder = {
  id: string;
  name: string;
  isFolder: boolean;
  items: Folder[];
};
