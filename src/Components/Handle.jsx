import React from 'react';
import styled from 'styled-components';

const UnstyledHandle = ({ className, name }) => {
  return <button className={className} />;
};

const Handle = styled(UnstyledHandle)`
  margin-left: 12px;
  background: none;
  border: none;
  -webkit-appearance: none;
  margin-right: 24px;
  cursor: grabbing;
  width: 10px;
  height: 16px;
  background-image: url('Handle.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Handle;
