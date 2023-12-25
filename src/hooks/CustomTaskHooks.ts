import { useEffect } from 'react';
import { TaskType, UpdateTaskParams } from '../components/ToDoList/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    addTodoAsync,
    deleteTodoAsync,
    getTodosAsync,
    updateTodoAsync,
} from '../store/TodosSlicer';
import { selectAllTodos } from '../store/store';

/**
 * A custom hook for managing tasks in a todo list.
 * 
 * @returns An array containing the current list of todos, and functions to add, delete, and update tasks.
 */
function useCustomTaskHooks(): [Array<TaskType>, (task: string) => void, (id: string) => void, (taskUpdates: TaskType) => void] {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);

    //TODO how to mock redux so it will 
    const todos: Array<TaskType> = useAppSelector(selectAllTodos);

    const addTask = (task: string) => {
        const todo = {
            description: task,
            isCompleted: false,
            isEditing: false,
        };
        dispatch(addTodoAsync(todo));
    };

    const deleteTask = (id: string) => {
        dispatch(deleteTodoAsync(id));
    };

    const updateTask = (taskUpdates: TaskType) => {
        dispatch(updateTodoAsync(taskUpdates));
    };

    return [todos, addTask, deleteTask, updateTask];
}

export default useCustomTaskHooks;
