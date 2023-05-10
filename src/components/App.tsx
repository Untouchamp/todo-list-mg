import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import uuid from 'uuidv4';
import './App.css';
import TodoWrapper from './ToDoList/TodoWrapper';
import { TaskType } from './ToDoList/types';

const todoTasks: Array<TaskType> = [
    {
        id: uuid(),
        task: 'Brush your teeth',
        completed: false,
        isEditing: false,
    },
    {
        id: uuid(),
        task: 'Go to school',
        completed: false,
        isEditing: false,
    },
    {
        id: uuid(),
        task: 'Buy groceries',
        completed: false,
        isEditing: false,
    },
    {
        id: uuid(),
        task: 'Pay bills',
        completed: true,
        isEditing: false,
    },
    {
        id: uuid(),
        task: 'Call mom',
        completed: false,
        isEditing: false,
    },
];
function App(): JSX.Element {
    return (
        <div>
            <TodoWrapper todoTasks={todoTasks} />
        </div>
    );
}

export default App;
