import React, { useState, useEffect } from "react";
import ContentContainer from "./Components/Layout/ContentContainer";
import Header from "./Components/Layout/Header";
import Layout from "./Components/Layout/Layout";
import List from "./Components/List";
import AddTodo from "./Components/AddTodo";

const initialItems = [
  { id: 1, name: "Write documentation for new website" },
  { id: 2, name: "Speak to Dave about code review process" },
  { id: 3, name: "Plan project show and tell" },
  { id: 4, name: "Buy Tessa a birthday card" }
];
const initialCompletedItems = [
  { id: 1, name: "Annual leave request for Holiday" },
  { id: 2, name: "Learn more about Typescript" },
  { id: 3, name: "Do some christmas shopping" }
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [completedItems, setCompletedItems] = useState(initialCompletedItems);

  const onSubmit = (name) => {
    setItems([...items, { id: 1, name }]);
  };

  useEffect(() => {
    setItems(initialItems);
  }, [items]);

  return (
    <div className="App">
      <Layout>
        <Header />
        <AddTodo onSubmit={onSubmit} />
        <ContentContainer>
          <List title="Todo" items={items} />
          <List title="Done" items={completedItems} />
        </ContentContainer>
      </Layout>
    </div>
  );
}
