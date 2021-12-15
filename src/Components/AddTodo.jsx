import React, { useState } from 'react';
import styled from 'styled-components';
import ContentContainer from './Layout/ContentContainer';

const UnstyledAddTodo = ({
  className,
  onSubmit,
  items = [],
  onSelectChange,
  parentID,
}) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
    setName('');
  };

  return (
    <div className={className}>
      <ContentContainer>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}>
          {items.length > 0 && (
            <select value={parentID ?? ''} onChange={onSelectChange}>
              <option value={''}>Please Select Item to Add Subitems</option>
              {items.map((el) => {
                return (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                );
              })}
            </select>
          )}
          <input
            value={name}
            placeholder="Enter new Todo..."
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" />
        </form>
      </ContentContainer>
    </div>
  );
};

const AddTodo = styled(UnstyledAddTodo)`
  width: 100%;
  display: block;
  background-color: ${(props) => props.theme.colors.grey1};
  padding: 0;
  margin-bottom: 47px;
  z-index: ${(props) => props.theme.zLayers.overlay};
  form {
    overflow: hidden;
    display: flex;
    position: relative;

    @media (max-width: ${(props) => props.theme.breakpoints.small}) {
      flex-direction: column;
    }
  }
  input {
    padding: 23px;
    background-color: ${(props) => props.theme.colors.grey2};
    border: none;
    outline: none;
    color: ${(props) => props.theme.colors.text};
    font-weight: 100;
    font-family: ${(props) => props.theme.fonts.primary};
    font-size: 16px;
    width: 100%;
    &::placeholder {
      color: ${(props) => props.theme.colors.text};
      font-weight: 100;
    }

    @media (max-width: ${(props) => props.theme.breakpoints.small}) {
      margin-top: 10px;
    }
  }
  select {
    padding: 23px;
    margin-right: 20px;
    background-color: ${(props) => props.theme.colors.grey2};
    border: none;
    outline: none;
    color: ${(props) => props.theme.colors.text};
    font-weight: 100;
    font-family: ${(props) => props.theme.fonts.primary};
    font-size: 16px;
    width: 100%;
    &::placeholder {
      color: ${(props) => props.theme.colors.text};
      font-weight: 100;
    }

    @media (max-width: ${(props) => props.theme.breakpoints.small}) {
      margin-bottom: 10px;
    }
  }
  button {
    width: 46px;
    height: 46px;
    position: absolute;
    top: 8px;
    right: 0;
    border-radius: 46px;
    border: none;
    background-color: blue;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:before {
      background-image: url('Plus.svg');
      background-size: contain;
      content: '';
      width: 20px;
      height: 20px;
    }

    @media (max-width: ${(props) => props.theme.breakpoints.small}) {
      top: 90px;
    }
  }
`;

export default AddTodo;
