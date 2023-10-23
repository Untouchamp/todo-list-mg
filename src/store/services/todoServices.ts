import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskType, UpdateTaskParams } from '../../components/ToDoList/types';

const todoServices = {
    getAllTodosService: async () => {
        const response = await fetch('http://localhost:7000/todos');
        if (response.ok) {
            const todos = await response.json();
            return todos as Array<TaskType>;
        }
        return null;
    },
    addTodoService: async (payload: string) => {
        const resp = await fetch('http://localhost:7000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo: payload }),
        });

        if (resp.ok) {
            const todo = await resp.json();
            return todo as TaskType;
        }
        return null;
    },
    updateTodoService: async (payload: UpdateTaskParams) => {
        const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (resp.ok) {
            const todo = await resp.json();
            return todo as TaskType;
        }
        return null;
    },
    deleteTodoService: async (payload: number) => {
        const resp = await fetch(`http://localhost:7000/todos/${payload}`, {
            method: 'DELETE',
        });

        if (resp.ok) {
            return { id: payload };
        }
        return null;
    },
};

export const {
    getAllTodosService,
    addTodoService,
    updateTodoService,
    deleteTodoService,
} = todoServices;
