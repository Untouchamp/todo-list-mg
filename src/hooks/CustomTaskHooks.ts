import { TaskType, UpdateTaskParams } from '../components/ToDoList/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    addTodoAsync,
    deleteTodoAsync,
    updateTodoAsync,
} from '../services/todoServices';

function useCustomTaskHooks() {
    const dispatch = useAppDispatch();
    const { todos }: Array<TaskType> = useAppSelector((state) => state.todos);

    const addTask = (task: string) => {
        dispatch(addTodoAsync(task));
    };

    const deleteTask = (id: string) => {
        dispatch(deleteTodoAsync(id));
    };

    const updateTask = ({
        id,
        taskText,
        isCompleted,
        isEditing,
    }: UpdateTaskParams) => {
        dispatch(updateTodoAsync({ id, taskText, isCompleted, isEditing }));
    };

    return [todos, addTask, deleteTask, updateTask];
}

export default useCustomTaskHooks;
