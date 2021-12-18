import React, { useState, useEffect } from 'react';
import ContentContainer from './Components/Layout/ContentContainer';
import Header from './Components/Layout/Header';
import Layout from './Components/Layout/Layout';
import List from './Components/List';
import AddTodo from './Components/AddTodo';
import { TodoContext } from './context/TodoContext';

const initialItems = [
  {
    id: 1,
    name: 'Write documentation for new website',
    isChecked: false,
    subItems: [
      { id: 1, name: 'Hello there!', isChecked: false },
      { id: 2, name: 'Hello there 2!', isChecked: false },
    ],
  },
  {
    id: 2,
    name: 'Speak to Dave about code review process',
    isChecked: false,
    subItems: [],
  },
  { id: 3, name: 'Plan project show and tell', isChecked: false, subItems: [] },
  { id: 4, name: 'Buy Tessa a birthday card', isChecked: false, subItems: [] },
];
const initialCompletedItems = [
  {
    id: 1,
    name: 'Annual leave request for Holiday',
    isChecked: true,
    subItems: [],
  },
  { id: 2, name: 'Learn more about Typescript', isChecked: true, subItems: [] },
  { id: 3, name: 'Do some christmas shopping', isChecked: true, subItems: [] },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [completedItems, setCompletedItems] = useState(initialCompletedItems);
  const [itemChanged, setItemChanged] = useState(false);
  const [completedChanged, setCompletedChanged] = useState(false);
  const [parentID, setParentID] = useState(null);

  const onAddTodo = (name) => {
    if (parentID) {
      setItems((prev) =>
        prev.map((el) =>
          el.id === Number(parentID)
            ? {
                ...el,
                subItems:
                  el.subItems.length > 0
                    ? [
                        ...el.subItems,
                        {
                          id: el.subItems[el.subItems.length - 1].id + 1,
                          name,
                          isChecked: false,
                        },
                      ]
                    : [
                        {
                          id: el.subItems.length + 1,
                          name,
                          isChecked: false,
                        },
                      ],
              }
            : { ...el }
        )
      );
      setParentID(null);
    } else {
      setItems((prev) => [
        ...prev,
        {
          id: prev[prev.length - 1].id + 1,
          name,
          isChecked: false,
        },
      ]);
    }
  };

  const onCheckboxChange = (
    id,
    checked,
    task,
    title,
    subItems = [],
    hasSub
  ) => {
    if (title === 'Todo' && checked) {
      setItemChanged(false);
      setCompletedChanged(false);
      setItems(items.filter((el) => el.id !== Number(id)));
      setCompletedItems((prev) => [
        ...prev,
        {
          id: prev[prev.length - 1].id + 1,
          name: task,
          isChecked: true,
          subItems:
            subItems.length > 0
              ? subItems.map((subEl) => ({ ...subEl, isChecked: true }))
              : subItems,
        },
      ]);
    }

    if (title === 'Done' && !checked) {
      setItemChanged(false);
      setCompletedChanged(false);
      setCompletedItems(completedItems.filter((el) => el.id !== Number(id)));
      setItems((prev) => [
        ...prev,
        {
          id: prev[prev.length - 1].id + 1,
          name: task,
          isChecked: false,
          subItems:
            subItems.length > 0 && !hasSub
              ? subItems.map((subEl) => ({ ...subEl, isChecked: false }))
              : subItems,
        },
      ]);
    }
  };

  useEffect(() => {
    if (itemChanged) {
      const selectedItem = items.find((el) => el.isChecked === true);
      if (selectedItem) {
        onCheckboxChange(
          selectedItem.id,
          selectedItem.isChecked,
          selectedItem.name,
          'Todo',
          selectedItem.subItems
        );
      }
    }
  });

  useEffect(() => {
    const selectedItem = completedItems.find((el) => el.isChecked === false);
    if (selectedItem) {
      onCheckboxChange(
        selectedItem.id,
        selectedItem.isChecked,
        selectedItem.name,
        'Done',
        selectedItem.subItems,
        true
      );
    }
  });

  const onSubItemChange = (id, checked, title, itemID) => {
    if (title === 'Todo') {
      setItems((prev) =>
        prev.map((el) => {
          if (el.id === Number(itemID)) {
            const subItems = el.subItems.map((subEl) =>
              subEl.id === Number(id)
                ? { ...subEl, isChecked: checked }
                : { ...subEl }
            );
            return {
              ...el,
              subItems,
              isChecked: subItems.every((sub) => sub.isChecked === true),
            };
          }
          return { ...el };
        })
      );
      setItemChanged(true);
    }

    if (title === 'Done') {
      setCompletedItems((prev) =>
        prev.map((el) => {
          if (el.id === Number(itemID)) {
            const subItems = el.subItems.map((subEl) =>
              subEl.id === Number(id)
                ? { ...subEl, isChecked: checked }
                : { ...subEl }
            );
            return {
              ...el,
              subItems,
              isChecked: subItems.every((sub) => sub.isChecked !== false),
            };
          }
          return { ...el };
        })
      );
      setCompletedChanged(true);
    }
  };

  return (
    <div className="App">
      <Layout>
        <Header />
        <AddTodo onSubmit={onAddTodo} items={items} />
        <ContentContainer>
          <TodoContext.Provider
            value={{
              onCheckboxChange,
              onSubItemChange,
              parentID,
              setParentID,
              onAddTodo,
            }}>
            <List title="Todo" items={items} />
            <List title="Done" items={completedItems} />
          </TodoContext.Provider>
        </ContentContainer>
      </Layout>
    </div>
  );
}
