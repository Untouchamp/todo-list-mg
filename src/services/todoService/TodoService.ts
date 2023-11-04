import { get, push, ref, remove, set, update } from 'firebase/database';
import { TaskType, UpdateTaskParams } from '../../components/ToDoList/types';
import { database } from '../firebaseService/FirebaseService';

const TODOS_DATABASE_PATH = 'todos';

const todoService = {
    //TODO refactor using local database from firebase
    getAllTodos: async (): Promise<TaskType[] | null> => {
        const todosRef = ref(database, TODOS_DATABASE_PATH);
        try {
            const snapshot = await get(todosRef);
            const todos: TaskType[] = snapshot.exists()
                ? Object.values(snapshot.val())
                : [];

            return todos;
        } catch (error) {
            console.error('Error updating task:', error);
            // throw error; // You can handle the error as needed
            return null;
        }
    },
    createTodo: async (todo: TaskType): Promise<TaskType | null> => {
        const todosRef = ref(database, TODOS_DATABASE_PATH);
        try {
            const newTodoRef = push(todosRef);
            if (newTodoRef.key === null) return null;
            const newTodo: TaskType = {
                ...todo,
                id: newTodoRef.key,
            };
            await set(newTodoRef, newTodo);
            return newTodo;
        } catch (error) {
            console.error('Error updating task:', error);
            // throw error; // You can handle the error as needed
            return null;
        }
    },
    updateTodo: async (taskUpdates: TaskType): Promise<TaskType | null> => {
        const { id } = taskUpdates;

        const todoRef = ref(database, `${TODOS_DATABASE_PATH}/${id}`);

        try {
            // Update the task in the database
            await update(todoRef, taskUpdates);
            // Task not found
        } catch (error) {
            console.error('Error updating task:', error);
            // throw error; // You can handle the error as needed
            return null;
        }
        return taskUpdates;
    },
    deleteTodo: async (todoId: string): Promise<{ id: string } | null> => {
        const todoRef = ref(database, `${TODOS_DATABASE_PATH}/${todoId}`);
        try {
            await remove(todoRef);
        } catch (error) {
            console.error('Error deleting task:', error);
            return null;
        }
        return { id: todoId };
    },
};
export default todoService;
