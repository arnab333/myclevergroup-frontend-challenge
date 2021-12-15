import React from "react";
import styled from "styled-components";
import Handle from "./Handle";

const Todo = ({ className, name }) => {
  return (
    <li>
      <Handle />
      {name}
    </li>
  );
};

export default Todo;
