import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskType, UpdateTaskParams } from '../components/ToDoList/types';

export const getTodosAsync = createAsyncThunk<Array<TaskType>>(
    'todos/getTodosAsync',
    async () => {
        const response = await fetch('http://localhost:7000/todos');
        if (response.ok) {
            const todos = await response.json();
            return todos as Array<TaskType>;
        }
    }
);

export const addTodoAsync = createAsyncThunk<{ todo: TaskType }>(
    'todos/addTodoAsync',
    async (payload: string) => {
        const resp = await fetch('http://localhost:7000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: payload }),
        });

        if (resp.ok) {
            const todo = await resp.json();
            return { todo } as { todo: TaskType };
        }
    }
);

export const updateTodoAsync = createAsyncThunk<{ todo: TaskType }>(
    'todos/updateTodoAsync',
    async (payload: UpdateTaskParams) => {
        const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (resp.ok) {
            const todo = await resp.json();
            return { todo } as { todo: TaskType };
        }
    }
);

export const deleteTodoAsync = createAsyncThunk<{ id: string }>(
    'todos/deleteTodoAsync',
    async (payload: number) => {
        const resp = await fetch(`http://localhost:7000/todos/${payload}`, {
            method: 'DELETE',
        });

        if (resp.ok) {
            return { id: payload };
        }
    }
);
