import { TaskType, UpdateTaskParams } from '../components/ToDoList/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    addTodoAsync,
    deleteTodoAsync,
    updateTodoAsync,
} from '../store/TodosSlicer';
import { selectAllTodos } from '../store/store';
import uuid from 'uuidv4';

function useCustomTaskHooks() {
    const dispatch = useAppDispatch();
    const todos: Array<TaskType> = useAppSelector(selectAllTodos);

    const addTask = (task: string) => {
        const todo = {
            id: uuid(),
            description: task,
            isCompleted: false,
            isEditing: false,
        };
        dispatch(addTodoAsync(todo));
    };

    const deleteTask = (id: string) => {
        dispatch(deleteTodoAsync(id));
    };

    const updateTask = ({
        id,
        description,
        isCompleted,
        isEditing,
    }: UpdateTaskParams) => {
        dispatch(updateTodoAsync({ id, description, isCompleted, isEditing }));
    };

    return [todos, addTask, deleteTask, updateTask, dispatch];
}

export default useCustomTaskHooks;
