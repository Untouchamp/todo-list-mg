import React from 'react';
import { CustomTypeHooksType, TodoWrapperType } from './types';
import TodoForm from './TodoForm';
import Todo from './Todo';
import taskManagementHandler from '../../hooks/CustomTaskHooks';

function TodoWrapper({ todoTasks }: TodoWrapperType): JSX.Element {
    const [tasks, addTask, deleteTodo, updateTask]: CustomTypeHooksType =
        taskManagementHandler(todoTasks);
    return (
        <div className="bg-gray-800 mt-20 p-8 rounded-md shadow-3xl">
            <h1>GET THINGS DONE</h1>
            <TodoForm addTask={addTask} />
            {tasks.map((task) => (
                <Todo
                    key={task.id}
                    task={task}
                    deleteTodo={deleteTodo}
                    updateTask={updateTask}
                />
            ))}
        </div>
    );
}

export default TodoWrapper;
