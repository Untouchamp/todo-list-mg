import {
    getDatabase,
    ref,
    push,
    set,
    update,
    remove,
    get,
    DataSnapshot,
} from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { TaskType, UpdateTaskParams } from '../../components/ToDoList/types';
import uuid from 'uuidv4';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    databaseURL: process.env.FIREBASE_DB_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
let authUID;

// Function to handle Google sign-in
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const { user } = result;
        console.log('User signed in with Google:', user);
        authUID = user.uid;
        return user;
        // You can handle user data as needed (e.g., save it to the database).
    } catch (error) {
        console.error('Google sign-in error:', error);
    }
};
const firebaseService = {
    getAllTodos: async (): Promise<TaskType[]> => {
        const todosRef = ref(database, `todos/${authUID}`);
        const snapshot = await get(todosRef);
        const todos: TaskType[] = [];

        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot: DataSnapshot) => {
                todos.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });
        }

        return todos;
    },
    createTodo: async (todo: TaskType) => {
        const todosRef = ref(database, `todos/${authUID}/${todo.id}`);
        await set(todosRef, todo);
        return todo;
    },
    updateTodo: async (params: UpdateTaskParams): Promise<TaskType | null> => {
        const { id, description, isCompleted, isEditing } = params;
        const todoRef = ref(database, `todos/${authUID}/${id}`);

        // Creating an object with the fields to update
        const updates: Partial<UpdateTaskParams> = {};

        if (description !== undefined) {
            updates.description = description;
        }

        if (isCompleted !== undefined) {
            updates.isCompleted = isCompleted;
        }

        if (isEditing !== undefined) {
            updates.isEditing = isEditing;
        }

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
        const todoRef = ref(database, `todos/${authUID}/${todoId}`);
        try {
            await remove(todoRef);
        } catch (error) {
            console.error('Error deleting task:', error);
            return null;
        }
        return { id: todoId };
    },
};

export default firebaseService;
