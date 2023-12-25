import { get, push, ref, remove, set, update } from 'firebase/database';
import { TaskType } from '../../components/ToDoList/types';
import { database } from '../firebaseService/FirebaseService';
import authenticationService from '../authenticationService/AuthenticationService';

const TODOS_DATABASE_PATH = 'todos';
const userId = authenticationService.getCurrentUserId;

const todoService = {
    getAllTodos: async (): Promise<TaskType[] | null> => {
        const todosRef = ref(database, `${userId()}/${TODOS_DATABASE_PATH}`);
        try {
            const snapshot = await get(todosRef);
            const todos: TaskType[] = snapshot.exists()
                ? Object.values(snapshot.val())
                : [];

            return todos;
        } catch (error) {
            console.error('Error updating task:', error);
            return null;
        }
    },
    createTodo: async (todo: {
        description: string,
        isCompleted: boolean,
        isEditing: boolean,
    }): Promise<TaskType | null> => {
        const todosRef = ref(database, `${userId()}/${TODOS_DATABASE_PATH}`);

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
            return null;
        }
    },
    updateTodo: async (taskUpdates: TaskType): Promise<TaskType | null> => {
        const { id } = taskUpdates;

        const todoRef = ref(
            database,
            `${userId()}/${TODOS_DATABASE_PATH}/${id}`
        );

        try {
            await update(todoRef, taskUpdates);
        } catch (error) {
            console.error('Error updating task:', error);
            return null;
        }
        return taskUpdates;
    },
    deleteTodo: async (todoId: string): Promise<{ id: string } | null> => {
        const todoRef = ref(
            database,
            `${userId()}/${TODOS_DATABASE_PATH}/${todoId}`
        );
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
