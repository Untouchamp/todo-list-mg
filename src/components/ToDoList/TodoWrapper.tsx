import React, { useEffect } from 'react';
import { CustomTypeHooksType, TaskType } from './types';
import TodoForm from './TodoForm';
import Todo from './Todo';
import useCustomTaskHooks from '../../hooks/CustomTaskHooks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTodosAsync } from '../../features/todoList/TodosSlicer';

function TodoWrapper(): JSX.Element {
    const [addTask, deleteTask, updateTask]: CustomTypeHooksType =
        useCustomTaskHooks();

    const dispatch = useAppDispatch();
    const { todos }: Array<TaskType> = useAppSelector((state) => state.todos);
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
