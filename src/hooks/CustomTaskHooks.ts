import { TaskType, UpdateTaskParams } from '../components/ToDoList/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    addTodoAsync,
    deleteTodoAsync,
    updateTodoAsync,
} from '../store/TodosSlicer';
import { selectAllTodos } from '../store/store';

function useCustomTaskHooks() {
    const dispatch = useAppDispatch();
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

    return [todos, addTask, deleteTask, updateTask, dispatch];
}

export default useCustomTaskHooks;
