import React, { useState } from "react";

function Todo(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(e.target.elements[0].id, e.target.elements[0].value);
    setEditing(false);
  }

  const [isEditing, setEditing] = useState(false);

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor="{props.id}">
          New name for {props.name}
        </label>
        <input type="text" className="todo-text" id={props.id}/>
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
          Cancel 
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input id={props.id} type="checkbox" defaultChecked={props.completed} onChange={props.toggleTaskCompleted} />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button type="button" className="btn btn__danger" id={props.id} onClick={props.deleteTask}>
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  return (
    <li className="todo stack-small">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}

export default Todo;