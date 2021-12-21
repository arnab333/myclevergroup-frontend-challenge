import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Todo from './Todo';

const UnstyledList = ({ className, title, items, columnId }) => {
  return (
    <div className={className}>
      <h2>{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => {
          return (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => {
                return (
                  <Todo {...item} key={item.id} title={title} index={index} />
                );
              })}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

const List = styled(UnstyledList)`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey2};
  padding: 30px 0;
  h2 {
    font-weight: 100;
    margin-bottom: 20px;
  }
`;

export default List;
