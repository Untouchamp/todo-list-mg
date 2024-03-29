import { configureStore } from '@reduxjs/toolkit';
import todosReducer, { todosAdapter } from './TodosSlicer';
import authReducer from './AuthSlicer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todosReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const { selectAll: selectAllTodos } =
    todosAdapter.getSelectors<RootState>((state) => state.todos);
export const selectUser = (state) => state.auth.user;
export const selectUserStatus = (state) => state.auth.status;
