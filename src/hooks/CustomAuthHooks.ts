import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    setUser,
    signInWithGoogleAsync,
    signOutAsync,
} from '../store/AuthSlicer';
import authenticationService from '../services/authenticationService/AuthenticationService';

function useCustomAuthHooks() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    useEffect(() => {
        authenticationService.listenForAuthChanges((user) => {
            dispatch(setUser(user));
        });
    }, [dispatch]);

    const signInGoogle = () => {
        dispatch(signInWithGoogleAsync());
    };

    const signOutCurrentUser = () => {
        dispatch(signOutAsync());
    };

    return [user, signInGoogle, signOutCurrentUser, dispatch];
}

export default useCustomAuthHooks;
