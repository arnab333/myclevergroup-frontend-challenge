import { createContext } from 'react';

export const TodoContext = createContext({
  onCheckboxChange: (id, checked, task, title, subItems) => {},
  onSubItemChange: (id, checked, title, itemID) => {},
  parentID: null,
  setParentID: (value) => {},
  onAddTodo: (name) => {},
});
