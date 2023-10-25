import { TaskType, UpdateTaskParams } from '../../components/ToDoList/types';

const todoServices = {
    getAllTodosService: async () => {
        try {
            const response = await fetch('http://localhost:7000/todos');

            const todos = await response.json();
            return todos as Array<TaskType>;
        } catch (error) {
            console.error('Error in getAllTodosService:', error);
            return null;
        }
    },
    addTodoService: async (payload: string) => {
        try {
            const resp = await fetch('http://localhost:7000/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ todo: payload }),
            });

            const todo = await resp.json();
            return todo as TaskType;
        } catch (error) {
            console.error('Error in addTodoService:', error);
            return null;
        }
    },
    updateTodoService: async (payload: UpdateTaskParams) => {
        try {
            const resp = await fetch(
                `http://localhost:7000/todos/${payload.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                }
            );

            const todo = await resp.json();
            return todo as TaskType;
        } catch (error) {
            console.error('Error in updateTodoService:', error);
            return null;
        }
    },
    deleteTodoService: async (payload: number) => {
        try {
            const resp = await fetch(`http://localhost:7000/todos/${payload}`, {
                method: 'DELETE',
            });

            return { id: payload };
        } catch (error) {
            console.error('Error in deleteTodoService:', error);
            return null;
        }
    },
};

export const {
    getAllTodosService,
    addTodoService,
    updateTodoService,
    deleteTodoService,
} = todoServices;
