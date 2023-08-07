import React from 'react';
import { CustomTypeHooksType, TodoWrapperType } from './types';
import TodoForm from './TodoForm';
import Todo from './Todo';
import taskManagementHandler from '../../hooks/CustomTaskHooks';

function TodoWrapper(props: TodoWrapperType): JSX.Element {
    const { todoTasks } = props;
    const [
        tasks,
        addTask,
        deleteTodo,
        editTodo,
        editTask,
        toggleComplete,
    ]: CustomTypeHooksType = taskManagementHandler(todoTasks);
    return (
        <div className="bg-gray-800 mt-20 p-8 rounded-md shadow-3xl">
            <h1>GET THINGS DONE</h1>
            <TodoForm addTask={addTask} />
            {tasks.map((task) => (
                <Todo
                    key={task.id}
                    task={task}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                    editTask={editTask}
                    toggleComplete={toggleComplete}
                />
            ))}
        </div>
    );
}

export default TodoWrapper;
