import { bySelfId } from './search';
import * as schema from '../schema';

const createItem = (itemData) => {
  const { type, prevData, title, parent_id } = itemData;
  const id = [...prevData].length + 1;

  let data = [...prevData, schema[type](title, id, parent_id)];

  return data;
};

const renameItem = (arr, id, title) => {
  const temp = [...arr];
  const current = bySelfId(temp, id);
  const renamed = { ...current, title };
  const updated = temp.map((item) =>
    item.id === parseInt(id) ? { ...renamed } : { ...item }
  );
  return updated;
};

const completeItem = (arr, id, state) => {
  const temp = [...arr];
  const current = bySelfId(temp, id);
  const completed = { ...current, completed: state };
  const updated = temp.map((item) =>
    item.id === parseInt(id) ? { ...completed } : { ...item }
  );
  return updated;
};

const removeItem = (arr, id) => {
  const updated = [...arr].filter((item) => item.id !== parseInt(id));

  return updated;
};

const removeItemByRef = (arr, id) => {
  return [...arr].filter((item) => item.ref_id === parseInt(id));
};

export { createItem, renameItem, completeItem, removeItem, removeItemByRef };
