import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TaskType, UpdateTaskParams } from '../../components/ToDoList/types';
import uuid from 'uuidv4';
import {
    addTodoAsync,
    deleteTodoAsync,
    getTodosAsync,
    updateTodoAsync,
} from '../../services/todoServices';

// Define a type for the slice state
interface TodosState {
    todos: Array<TaskType>;
}

// Define the initial state using that type
const initialState: TodosState = {
    todos: [],
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state: TodosState, action: PayloadAction<string>) => {
            const newTodoList = {
                id: uuid(),
                description: action.payload,
                isCompleted: false,
                isEditing: false,
            };
            state.todos.push(newTodoList);
        },
        deleteTodo: (state: TodosState, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(
                (item) => item.id !== action.payload
            );
        },
        updateTodo: (
            state: TodosState,
            action: PayloadAction<UpdateTaskParams>
        ) => {
            const taskIndex = state.todos.findIndex(
                (task) => task.id === action.payload.id
            );

            if (taskIndex !== -1) {
                const updatedTask = {
                    ...state.todos[taskIndex],
                    description:
                        action.payload.taskText ??
                        state.todos[taskIndex].description,
                    isCompleted:
                        action.payload.isCompleted ??
                        state.todos[taskIndex].isCompleted,
                    isEditing:
                        action.payload.isEditing ??
                        state.todos[taskIndex].isEditing,
                };

                const updatedTasks = [...state.todos];
                updatedTasks[taskIndex] = updatedTask;

                state.todos = updatedTasks;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodosAsync.fulfilled, (state: TodosState, action) => {
                state.todos = action.payload;
            })
            .addCase(addTodoAsync.fulfilled, (state: TodosState, action) => {
                state.todos.push(action.payload.todo);
            })
            .addCase(updateTodoAsync.fulfilled, (state: TodosState, action) => {
                const index = state.todos.findIndex(
                    (todo) => todo.id === action.payload.todo.id
                );
                const updatedTasks = [...state.todos];
                updatedTasks[index] = action.payload.todo;

                state.todos = updatedTasks;
            })
            .addCase(deleteTodoAsync.fulfilled, (state: TodosState, action) => {
                state.todos = state.todos.filter(
                    (todo) => todo.id !== action.payload.id
                );
            });
    },
});

export const { addTodo, deleteTodo, updateTodo } = todosSlice.actions;

export default todosSlice.reducer;
