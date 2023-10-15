import { UpdateTaskParams } from '../components/ToDoList/types';
import { useAppDispatch } from '../app/hooks';
import {
    addTodoAsync,
    deleteTodoAsync,
    updateTodo,
    updateTodoAsync,
} from '../features/todoList/TodosSlicer';

function useCustomTaskHooks() {
    const dispatch = useAppDispatch();

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

    return [addTask, deleteTask, updateTask];
}

export default useCustomTaskHooks;
