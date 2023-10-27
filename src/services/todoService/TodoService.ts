import { TaskType, UpdateTaskParams } from '../../components/ToDoList/types';
enum HTTP_METHODS {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}
const CONTENT_TYPE = 'application/json';
//TODO add types for each service
const todoService = {
    getAllTodosService: async () => {
        try {
            const response = await fetch(`${process.env.SERVICE_URL}/todos`);
            //TODO how to set up database Real Time Database (preferred horizontal structure)
            const todos = await response.json();
            return todos as Array<TaskType>;
        } catch (error) {
            console.error('Error in getAllTodosService:', error);
            return null;
        }
    },
    addTodoService: async (payload: string) => {
        try {
            const resp = await fetch(`${process.env.SERVICE_URL}/todos`, {
                method: HTTP_METHODS.POST,
                headers: {
                    'Content-Type': CONTENT_TYPE,
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
                `${process.env.SERVICE_URL}/todos/${payload.id}`,
                {
                    method: HTTP_METHODS.PATCH,
                    headers: {
                        'Content-Type': CONTENT_TYPE,
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
            const resp = await fetch(
                `${process.env.SERVICE_URL}/todos/${payload}`,
                {
                    method: HTTP_METHODS.DELETE,
                }
            );

            return { id: payload };
        } catch (error) {
            console.error('Error in deleteTodoService:', error);
            return null;
        }
    },
};

export default todoService;
