import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authenticationService from '../services/authenticationService/AuthenticationService';

export enum LOGIN_STATUS {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCEEDED = 'succeeded',
}

export const signInWithGoogleAsync = createAsyncThunk(
    'auth/signInWithGoogle',
    async () => {
        const user = await authenticationService.signInWithGoogle();
        return user;
    }
);

export const signOutAsync = createAsyncThunk('auth/signOut', async () => {
    const user = await authenticationService.signOutUser();
    return user;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null, // Initial user state is null.
        status: LOGIN_STATUS.IDLE,
    },
    reducers: {
        setUser: (state, action) => {
            if (!action.payload) return;
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            if (!action.payload) return;
            state.status = LOGIN_STATUS.SUCCEEDED;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(signInWithGoogleAsync.pending, (state) => {
                state.status = LOGIN_STATUS.LOADING;
            })
            .addCase(signInWithGoogleAsync.fulfilled, (state, action) => {
                if (!action.payload) return;
                state.status = LOGIN_STATUS.SUCCEEDED;
                state.user = action.payload;
            })
            .addCase(signOutAsync.fulfilled, (state) => {
                state.user = null;
            }),
});

export const { setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
