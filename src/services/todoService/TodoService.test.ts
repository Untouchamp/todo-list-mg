import { get, push, set, update, remove } from 'firebase/database';
import todoService from './TodoService';

jest.mock('../firebaseService/FirebaseService', () => ({
    auth: jest.fn(),
    provider: jest.fn(),
}));
jest.mock('firebase/database');

describe('Todo Service Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get all todos', async () => {
        const mockSnapshot = {
            exists: jest.fn().mockReturnValue(true),
            val: jest.fn().mockReturnValue({
                task1: {
                    id: 'task1',
                    description: 'Task 1',
                    isCompleted: false,
                    isEditing: false,
                },
                task2: {
                    id: 'task2',
                    description: 'Task 2',
                    isCompleted: true,
                    isEditing: false,
                },
            }),
        };
        (get as jest.Mock).mockResolvedValue(mockSnapshot);

        const result = await todoService.getAllTodos();
        expect(result).toHaveLength(2);
    });

    it('should create a todo', async () => {
        const newTodo = {
            description: 'New Task',
            isCompleted: false,
            isEditing: false,
        };
        const mockNewTodoRef = {
            key: 'newTaskId',
        };
        (push as jest.Mock).mockReturnValue(mockNewTodoRef);
        (set as jest.Mock).mockResolvedValue(true);

        const result = await todoService.createTodo(newTodo);
        expect(result).toEqual({ ...newTodo, id: 'newTaskId' });
    });

    it('should update a todo', async () => {
        const updatedTodo = {
            id: 'task1',
            description: 'Updated Task',
            isCompleted: true,
            isEditing: false,
        };
        (update as jest.Mock).mockResolvedValue(true);

        const result = await todoService.updateTodo(updatedTodo);
        expect(result).toEqual(updatedTodo);
    });

    it('should delete a todo', async () => {
        const todoId = 'task1';
        (remove as jest.Mock).mockResolvedValue(true);

        const result = await todoService.deleteTodo(todoId);
        expect(result).toEqual({ id: todoId });
    });

    it('should handle empty todos', async () => {
        const mockSnapshot = {
            exists: jest.fn().mockReturnValue(false), // Mocking an empty todo list
        };
        (get as jest.Mock).mockResolvedValue(mockSnapshot);

        const result = await todoService.getAllTodos();
        expect(result).toHaveLength(0);
    });

    it('should handle errors in get all todos', async () => {
        (get as jest.Mock).mockRejectedValue(
            'Error occurred while fetching todos'
        );

        const result = await todoService.getAllTodos();
        expect(result).toBeNull();
    });

    it('should handle errors in create todo', async () => {
        (push as jest.Mock).mockReturnValue(null); // Mock an unsuccessful push
        (set as jest.Mock).mockRejectedValue(
            'Error occurred while creating todo'
        );

        const result = await todoService.createTodo({
            description: 'New Task',
            isCompleted: false,
            isEditing: false,
        });
        expect(result).toBeNull();
    });

    it('should handle errors in update todo', async () => {
        (update as jest.Mock).mockRejectedValue(
            'Error occurred while updating todo'
        );

        const result = await todoService.updateTodo({
            id: 'task1',
            description: 'Updated Task',
            isCompleted: true,
            isEditing: false,
        });
        expect(result).toBeNull();
    });

    it('should handle errors in delete todo', async () => {
        (remove as jest.Mock).mockRejectedValue(
            'Error occurred while deleting todo'
        );

        const result = await todoService.deleteTodo('task1');
        expect(result).toBeNull();
    });
});
