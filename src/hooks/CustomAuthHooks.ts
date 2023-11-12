import { useEffect } from 'react';
import { User } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    LOGIN_STATUS,
    setLoading,
    setUser,
    signInWithGoogleAsync,
    signOutAsync,
} from '../store/AuthSlicer';
import authenticationService from '../services/authenticationService/AuthenticationService';
import { selectUser, selectUserStatus } from '../store/store';

function useCustomAuthHooks() {
    const dispatch = useAppDispatch();
    const user: User = useAppSelector(selectUser);
    const isLoaded: boolean =
        useAppSelector(selectUserStatus) !== LOGIN_STATUS.SUCCEEDED;

    useEffect(() => {
        authenticationService.listenForAuthChanges((user) => {
            dispatch(setUser(user));
            dispatch(setLoading(LOGIN_STATUS.SUCCEEDED));
        });
    }, [dispatch]);

    const signInGoogle = () => {
        dispatch(signInWithGoogleAsync());
    };

    const signOutCurrentUser = () => {
        dispatch(signOutAsync());
    };

    return [user, isLoaded, signInGoogle, signOutCurrentUser, dispatch];
}

export default useCustomAuthHooks;
