import type { Folder } from "../types";

export const useTraverseTree = () => {
  const insertNode = function (
    tree: Folder,
    folderId: string,
    item: string,
    isFolder: boolean
  ): Folder {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime().toString(),
        name: item,
        isFolder: isFolder,
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };

  return { insertNode };
};
