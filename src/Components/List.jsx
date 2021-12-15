import React from 'react';
import styled from 'styled-components';
import Todo from './Todo';

const UnstyledList = ({ className, title, items }) => {
  return (
    <div className={className}>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => {
          return <Todo {...item} key={item.id} title={title} />;
        })}
      </ul>
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
