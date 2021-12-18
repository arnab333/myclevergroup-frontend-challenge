import React, { useContext, Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { TodoContext } from '../context/TodoContext';
import Handle from './Handle';

const UnstyledTodo = ({
  className,
  id,
  name,
  isChecked,
  subItems = [],
  title,
}) => {
  const ctx = useContext(TodoContext);
  const [parentID, setParentID] = useState(null);
  const [subTask, setSubTask] = useState('');

  useEffect(() => {
    if (parentID) {
      ctx.setParentID(parentID);
    }
  }, [parentID]);

  const onInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      ctx.onAddTodo(subTask);
      setSubTask('');
    }
  };

  return (
    <Fragment>
      <li className={className}>
        <div className="row">
          <div className="col-2 col-sm-1 pt-3">
            <Handle />
          </div>
          <div className="col-8 col-sm-10 pt-3">
            {name}
            {title === 'Todo' && (
              <div className="row py-2 subtask" onClick={() => setParentID(id)}>
                <div className="col">+ Add Subtask</div>
              </div>
            )}
          </div>
          <div className="col-2 col-sm-1">
            <Checkbox
              id={id}
              name={name}
              title={title}
              subItems={subItems}
              isChecked={isChecked}
            />
          </div>
        </div>
        {subItems.length > 0 &&
          subItems.map((el) => {
            return (
              <Fragment key={el.id}>
                <div className="row sub-items pb-3">
                  <div className="offset-2 offset-sm-1 col-8 col-sm-10 pt-3">
                    {el.name}
                  </div>
                  <div className="col-2 col-sm-1">
                    <Checkbox
                      id={el.id}
                      itemID={id}
                      name={el.name}
                      title={title}
                      subItems={subItems}
                      isChecked={el.isChecked}
                      isSmall
                    />
                  </div>
                </div>
              </Fragment>
            );
          })}
        <div
          className="row pb-2"
          style={{ display: parentID ? 'flex' : 'none' }}>
          <div className="col offset-2 offset-sm-1">
            <input
              type={'text'}
              placeholder="Enter Subtask"
              id="subTask"
              value={subTask}
              onChange={(e) => setSubTask(e.target.value)}
              onKeyDown={onInputKeyDown}
            />
          </div>
        </div>
      </li>
    </Fragment>
  );
};

const UnstyledCheckbox = ({
  className,
  id,
  itemID,
  name,
  title,
  subItems,
  isChecked,
  isSmall,
}) => {
  const ctx = useContext(TodoContext);
  return (
    <div className={`${className}`}>
      <label className="container">
        <input
          type="checkbox"
          type="checkbox"
          name={id}
          onChange={(event) =>
            isSmall
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
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

const Checkbox = styled(UnstyledCheckbox)`
  /* The container */
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: ${(props) => (props.isSmall ? '18px' : '25px')};
    width: ${(props) => (props.isSmall ? '18px' : '25px')};
    background-color: #eee;
    /* custom */
    border-radius: 50%;
    background-color: #1c1c21;
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #ccc;
    /* custom */
    background-color: #fb6664;
  }

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: #2196f3;
    /* custom */
    background-color: #1c1c21;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: ${(props) => (props.isSmall ? '5px' : '9px')};
    top: ${(props) => (props.isSmall ? '0.5px' : '5px')};
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  /* custom */
  .container:hover .checkmark:after {
    display: block;
  }
`;

const Todo = styled(UnstyledTodo)`
  width: 100%;
  min-height: 80px;
  border-radius: 10px;
  background-color: #292931;
  margin-bottom: 10px;

  .subtask {
    font-size: 12px;
    color: #666670;
    cursor: pointer;
  }

  .sub-items {
    font-size: 12.5px;

    .hr {
      border-bottom: 0.5px solid #666670;
      width: 99%;
    }

    .col-sm-1 {
      padding-left: 1rem;
    }
  }

  input {
    background-color: #292931;
    color: white;
    border: none;
  }
`;

export default Todo;
