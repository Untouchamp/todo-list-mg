import React, { useEffect } from 'react';
import { CustomTypeHooksType, TaskType } from './types';
import TodoForm from './TodoForm';
import Todo from './Todo';
import useCustomTaskHooks from '../../hooks/CustomTaskHooks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getTodosAsync } from '../../services/todoServices';

function TodoWrapper(): JSX.Element {
    const [todos, addTask, deleteTask, updateTask]: CustomTypeHooksType =
        useCustomTaskHooks();

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);
    return (
        <div className="bg-gray-800 mt-20 p-8 rounded-md shadow-3xl">
            <h1>GET THINGS DONE</h1>
            <TodoForm addTask={addTask} />
            {todos.map((task) => (
                <Todo
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                />
            ))}
        </div>
    );
}

export default TodoWrapper;
