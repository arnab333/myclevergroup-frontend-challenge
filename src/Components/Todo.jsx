import React, { useContext } from 'react';
import styled from 'styled-components';
import { TodoContext } from '../context/TodoContext';
import Handle from './Handle';

const Todo = ({
  className,
  id,
  name,
  isChecked,
  subItems = [],
  title,
  itemID,
}) => {
  const ctx = useContext(TodoContext);
  return (
    <li>
      {/* <Handle /> */}
      <input
        type="checkbox"
        name={id}
        onChange={(event) =>
          itemID
            ? ctx.onSubItemChange(
                event.target.name,
                event.target.checked,
                title,
                itemID
              )
            : ctx.onCheckboxChange(
                event.target.name,
                event.target.checked,
                name,
                title,
                subItems
              )
        }
        checked={isChecked}
      />
      {name}

      {subItems.length > 0 && (
        <SubItem subItems={subItems} itemID={id} title={title} />
      )}
    </li>
  );
};

export default Todo;

const SubItem = ({ subItems, itemID, title }) => {
  return (
    <ul style={{ marginLeft: `1rem` }}>
      {subItems &&
        subItems.length > 0 &&
        subItems.map((el) => {
          return <Todo {...el} key={el.id} title={title} itemID={itemID} />;
        })}
    </ul>
  );
};
