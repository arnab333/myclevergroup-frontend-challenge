import React, { useState } from "react";
import styled from "styled-components";
import ContentContainer from "./Layout/ContentContainer";

const UnstyledAddTodo = ({ className, onSubmit }) => {
  const [name, setName] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
  };

  return (
    <div className={className}>
      <ContentContainer>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
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
  }
  button {
    width: 46px;
    height: 46px;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 46px;
    border: none;
    background-color: blue;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:before {
      background-image: url("Plus.svg");
      background-size: contain;
      content: "";
      width: 20px;
      height: 20px;
    }
  }
`;

export default AddTodo;
