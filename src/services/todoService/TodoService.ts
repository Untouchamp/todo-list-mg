import { get, push, ref, remove, set, update } from 'firebase/database';
import { TaskType, UpdateTaskParams } from '../../components/ToDoList/types';
import { database } from '../firebaseService/FirebaseService';

const todoService = {
    getAllTodos: async (): Promise<TaskType[] | null> => {
        const todosRef = ref(database, 'todos');
        try {
            const snapshot = await get(todosRef);
            const todos: TaskType[] = snapshot.exists()
                ? Object.values(snapshot.val()).map((childSnapshot: any) => ({
                      id: childSnapshot.key,
                      ...childSnapshot,
                  }))
                : [];

            return todos;
        } catch (error) {
            console.error('Error updating task:', error);
            // throw error; // You can handle the error as needed
            return null;
        }
    },
    createTodo: async (todo: TaskType): Promise<TaskType | null> => {
        const todosRef = ref(database, `todos`);
        try {
            const newTodoRef = push(todosRef);
            const newTodo = {
                ...todo,
                id: newTodoRef.key,
            };
            await set(newTodoRef, newTodo);
            return newTodo as TaskType;
        } catch (error) {
            console.error('Error updating task:', error);
            // throw error; // You can handle the error as needed
            return null;
        }
    },
    updateTodo: async (params: UpdateTaskParams): Promise<TaskType | null> => {
        const { id } = params;

        const todoRef = ref(database, `todos/${id}`);

        const updates = Object.fromEntries(
            Object.entries(params).filter(([_, value]) => value !== undefined)
        );
        try {
            // Update the task in the database
            await update(todoRef, updates);

            // Fetch the updated task from the database
            const updatedTaskSnapshot = await get(todoRef);
            const updatedTask = updatedTaskSnapshot.val();
            if (updatedTask) {
                // Return the updated task
                return updatedTask;
            }
            // Task not found
            return null;
        } catch (error) {
            console.error('Error updating task:', error);
            // throw error; // You can handle the error as needed
            return null;
        }
    },
    deleteTodo: async (todoId: string): Promise<{ id: string } | null> => {
        const todoRef = ref(database, `todos/${todoId}`);
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
