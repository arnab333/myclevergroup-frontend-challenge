import React, { useState, useEffect, Fragment } from 'react';
import { v4 } from 'uuid';
import { DragDropContext } from 'react-beautiful-dnd';

import ContentContainer from './Components/Layout/ContentContainer';
import Header from './Components/Layout/Header';
import Layout from './Components/Layout/Layout';
import List from './Components/List';
import AddTodo from './Components/AddTodo';
import { TodoContext } from './context/TodoContext';
import { sectionTitle } from './helpers/constants';

const initialItems = [
  {
    id: v4(),
    name: 'Write documentation for new website',
    isChecked: false,
    subItems: [
      { id: v4(), name: 'Hello there!', isChecked: false },
      { id: v4(), name: 'Hello there 2!', isChecked: false },
    ],
  },
  {
    id: v4(),
    name: 'Speak to Dave about code review process',
    isChecked: false,
    subItems: [],
  },
  {
    id: v4(),
    name: 'Plan project show and tell',
    isChecked: false,
    subItems: [],
  },
  {
    id: v4(),
    name: 'Buy Tessa a birthday card',
    isChecked: false,
    subItems: [],
  },
];
const initialCompletedItems = [
  {
    id: v4(),
    name: 'Annual leave request for Holiday',
    isChecked: true,
    subItems: [],
  },
  {
    id: v4(),
    name: 'Learn more about Typescript',
    isChecked: true,
    subItems: [],
  },
  {
    id: v4(),
    name: 'Do some christmas shopping',
    isChecked: true,
    subItems: [],
  },
];

const columnsFromBackend = {
  [v4()]: {
    name: sectionTitle.todo,
    items: initialItems,
  },
  [v4()]: {
    name: sectionTitle.done,
    items: initialCompletedItems,
  },
};

export default function App() {
  const [items, setItems] = useState(
    Object.entries(columnsFromBackend)[0][1].items
  );
  const [completedItems, setCompletedItems] = useState(
    Object.entries(columnsFromBackend)[1][1].items
  );
  const [itemChanged, setItemChanged] = useState(false);
  const [completedChanged, setCompletedChanged] = useState(false);
  const [parentID, setParentID] = useState(null);
  const [columns, setColumns] = useState(columnsFromBackend);

  const onAddTodo = (name) => {
    if (parentID) {
      setItems((prev) =>
        prev.map((el) =>
          el.id === parentID
            ? {
                ...el,
                subItems:
                  el.subItems.length > 0
                    ? [
                        ...el.subItems,
                        {
                          id: v4(),
                          name,
                          isChecked: false,
                        },
                      ]
                    : [
                        {
                          id: v4(),
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
          id: v4(),
          name,
          isChecked: false,
          subItems: [],
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
    hasSub,
    isDragged
  ) => {
    if (title === sectionTitle.todo && checked) {
      setItemChanged(false);
      setCompletedChanged(false);
      setItems(items.filter((el) => el.id !== id));
      setCompletedItems((prev) => [
        ...prev,
        {
          id: v4(),
          name: task,
          isChecked: true,
          subItems:
            subItems.length > 0
              ? subItems.map((subEl) => ({ ...subEl, isChecked: true }))
              : subItems,
        },
      ]);
    }

    if (title === sectionTitle.done && !checked && !isDragged) {
      setItemChanged(false);
      setCompletedChanged(false);
      setCompletedItems(completedItems.filter((el) => el.id !== id));
      setItems((prev) => [
        ...prev,
        {
          id: v4(),
          name: task,
          isChecked: false,
          subItems:
            subItems.length > 0 && !hasSub
              ? subItems.map((subEl) => ({ ...subEl, isChecked: false }))
              : subItems,
        },
      ]);
    } else if (title === sectionTitle.done && !checked && isDragged) {
      setItemChanged(false);
      setCompletedChanged(false);
      setCompletedItems(completedItems.filter((el) => el.id !== id));
      setItems((prev) => [
        ...prev,
        {
          id: v4(),
          name: task,
          isChecked: false,
          subItems: subItems.map((subEl) => ({ ...subEl, isChecked: false })),
        },
      ]);
    }
  };

  const onTodoDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (columnsFromBackend[source.droppableId].name === sectionTitle.todo) {
      const matched = items.find((el) => el.id === draggableId);
      if (matched) {
        onCheckboxChange(
          draggableId,
          true,
          matched.name,
          sectionTitle.todo,
          matched.subItems,
          matched.subItems.length > 0
        );
      }
    } else {
      const matched = completedItems.find((el) => el.id === draggableId);
      if (matched) {
        onCheckboxChange(
          draggableId,
          false,
          matched.name,
          sectionTitle.done,
          matched.subItems,
          matched.subItems.length > 0,
          true
        );
      }
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
          sectionTitle.todo,
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
        sectionTitle.done,
        selectedItem.subItems,
        true
      );
    }
  });

  const onSubItemChange = (id, checked, title, itemID) => {
    if (title === sectionTitle.todo) {
      setItems((prev) =>
        prev.map((el) => {
          if (el.id === itemID) {
            const subItems = el.subItems.map((subEl) =>
              subEl.id === id ? { ...subEl, isChecked: checked } : { ...subEl }
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

    if (title === sectionTitle.done) {
      setCompletedItems((prev) =>
        prev.map((el) => {
          if (el.id === itemID) {
            const subItems = el.subItems.map((subEl) =>
              subEl.id === id ? { ...subEl, isChecked: checked } : { ...subEl }
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
        <AddTodo onSubmit={onAddTodo} />
        <ContentContainer>
          <TodoContext.Provider
            value={{
              onCheckboxChange,
              onSubItemChange,
              parentID,
              setParentID,
              onAddTodo,
            }}>
            <DragDropContext
              // onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
              onDragEnd={(result) => onTodoDragEnd(result)}>
              {/* <List title="Todo" items={items} /> */}
              {/* <List title="Done" items={completedItems} /> */}
              {Object.entries(columns).map(([columnId, column]) => {
                return (
                  <Fragment key={columnId}>
                    {column.name === sectionTitle.todo ? (
                      <List
                        title={column.name}
                        items={items}
                        columnId={columnId}
                      />
                    ) : (
                      <List
                        title={column.name}
                        items={completedItems}
                        columnId={columnId}
                      />
                    )}
                  </Fragment>
                );
              })}
            </DragDropContext>
          </TodoContext.Provider>
        </ContentContainer>
      </Layout>
    </div>
  );
}
