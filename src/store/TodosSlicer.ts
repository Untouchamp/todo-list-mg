import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { TaskType, UpdateTaskParams } from '../components/ToDoList/types';
import {
    getAllTodosService,
    addTodoService,
    deleteTodoService,
    updateTodoService,
} from './services/todoServices';

export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        const todos = await getAllTodosService();
        return todos;
    }
);

export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async (payload: string) => {
        const addedTodo = await addTodoService(payload);
        return addedTodo;
    }
);

export const updateTodoAsync = createAsyncThunk(
    'todos/updateTodoAsync',
    async (payload: UpdateTaskParams) => {
        const updatedTodo = await updateTodoService(payload);
        return updatedTodo;
    }
);

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodoAsync',
    async (payload: number) => {
        const deletedTodoId = await deleteTodoService(payload);
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
