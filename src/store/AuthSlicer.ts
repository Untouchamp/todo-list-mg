import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authenticationService from '../services/authenticationService/AuthenticationService';

export const signInWithGoogleAsync = createAsyncThunk(
    'auth/signInWithGoogle',
    async () => {
        const user = await authenticationService.signInWithGoogle();
        console.log(user, 'In service');
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
        status: 'idle',
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInWithGoogleAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signInWithGoogleAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload);
                if (!action.payload) return;
                state.user = action.payload;
                console.log(state.user);
            })
            .addCase(signOutAsync.fulfilled, (state) => {
                state.user = null;
            });
    },
});

const { setUser } = authSlice.actions;

export const listenForAuthChangesHandler = () => (dispatch) => {
    authenticationService.listenForAuthChanges((authUser) => {
        dispatch(setUser(authUser));
    });
};

export default authSlice.reducer;
