import React from 'react';
import './App.css';
import TodoWrapper from './ToDoList/TodoWrapper';
import tasksMockData from '../../mocks/TasksMockData';

function App(): JSX.Element {
    return (
        <div>
            <TodoWrapper todoTasks={tasksMockData} />
        </div>
    );
}

export default App;
