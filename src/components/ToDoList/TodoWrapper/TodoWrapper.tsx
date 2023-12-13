import React, { useEffect } from 'react';
import TodoForm from '../TodoForm/TodoForm';
import Todo from '../Todo/Todo';
import useCustomTaskHooks from '../../../hooks/CustomTaskHooks';

function TodoWrapper(): JSX.Element {
    const [
        todos,
        addTask,
        deleteTask,
        updateTask,
    ] = useCustomTaskHooks();

    console.log(todos);
    

    

    return (
        <div className="bg-gray-800 mt-20 p-8 rounded-md shadow-3xl">
            <h1>GET THINGS DONE</h1>
            <TodoForm addTask={addTask} />
            {todos.length > 0 ? (
                todos.map((task) => (
                    <Todo
                        key={task.id}
                        task={task}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                    />
                ))
            ) : (
                <div data-testid="empty-list-placeholder" className="flex relative justify-center text-gray-400 text-center">
                    Oops! The task list is as empty as a clear sky. 🌟
                    <br />
                    Why not add your first task? 🚀
                </div>
            )}
        </div>
    );
}

export default TodoWrapper;
