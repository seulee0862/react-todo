import React, { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "./TodoItem.css";

const TodoItem = ({
  todo,
  onCheckToggle,
  onInsertToggle,
  onChangeSelectedTodo,
}) => {
  const { id, name, content, checked } = todo;
  const [show, setShow] = useState(false);
  return (
    <div className="TodoItem">
        <div className="TodoItem-firstLine">
      <div className={`content ${checked ? "checked" : ""} btn`}>
        {checked ? (
          <MdCheckBox
            onClick={() => {
              onCheckToggle(id);
            }}
          />
        ) : (
          <MdCheckBoxOutlineBlank
            onClick={() => {
              onCheckToggle(id);
            }}
          />
        )}
        </div>
        <div className="name" onClick={() => setShow(!show)}>
          {name}
        </div>
    
        <div className="buttons">
          <button
            className="edit-btn"
            onClick={() => {
              onChangeSelectedTodo(todo);
              onInsertToggle();
            }}
          >
            <FaEdit />
          </button>
        </div>
        </div>
        <div>
        {show === true && (
          <div
            className="content"
            onClick={() => {
              onChangeSelectedTodo(todo);
              onInsertToggle();
            }}
          >
            {content}
          </div>
        )}
        </div>
    </div>
  );
};

export default TodoItem;