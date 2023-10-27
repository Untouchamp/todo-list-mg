import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { TaskType, UpdateTaskParams } from '../components/ToDoList/types';
import firebaseService from '../services/firebaseService/FirebaseService';

export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        const todos = await firebaseService.getAllTodos();
        return todos;
    }
);

export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async (payload: string) => {
        const addedTodo = await firebaseService.createTodo(payload);
        return addedTodo;
    }
);

export const updateTodoAsync = createAsyncThunk(
    'todos/updateTodoAsync',
    async (payload: UpdateTaskParams) => {
        const updatedTodo = await firebaseService.updateTodo(payload);
        return updatedTodo;
    }
);

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodoAsync',
    async (payload: number) => {
        const deletedTodoId = await firebaseService.deleteTodo(payload);
        return deletedTodoId;
    }
);
export const todosAdapter = createEntityAdapter<TaskType>({
    selectId: (todo) => todo.id,
});

export const todosSlice = createSlice({
    name: 'todos',
    initialState: todosAdapter.getInitialState(),
    reducers: {
        addDump: () => {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodosAsync.fulfilled, (state, action) => {
                if (!action.payload) return;
                todosAdapter.upsertMany(state, action.payload);
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                if (!action.payload) return;
                todosAdapter.addOne(state, action.payload);
            })
            .addCase(updateTodoAsync.fulfilled, (state, action) => {
                if (!action.payload) return;
                todosAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: action.payload,
                });
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                if (!action.payload) return;
                todosAdapter.removeOne(state, action.payload.id);
            });
    },
});

export default todosSlice.reducer;
