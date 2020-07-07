import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const json = JSON.stringify(tasks);
    localStorage.setItem('tasks', json);
  }, [tasks])

  useEffect(() => {
    const taskJSON = localStorage.getItem('tasks');
    const taskArray = JSON.parse(taskJSON);
    console.log(taskArray);
  })

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo 
        name={task.name} 
        completed={task.completed} 
        id={task.id} 
        key={task.id} 
        toggleTaskCompleted={toggleTaskCompleted} 
        deleteTask={deleteTask} 
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksRemaining = `${taskList.length} ${taskList.length !== 1 ? 'tasks' : 'task'} remaining`;

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(e) {
    const deletedID = e.target.id;
    const updatedTasks = tasks.filter(task => deletedID !== task.id);
    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function toggleTaskCompleted(e) {
    const updatedID = e.target.id;
    const updatedTasks = tasks.map(task => {
      if (updatedID === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  return (
    <div className="todoapp stack-large">
      <h1>React Todo List</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {tasksRemaining}
      </h2>
      <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
