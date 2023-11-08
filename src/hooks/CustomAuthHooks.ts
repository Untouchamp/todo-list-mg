import { useAppDispatch, useAppSelector } from '../store/hooks';
import { signInWithGoogleAsync, signOutAsync } from '../store/AuthSlicer';

function useCustomAuthHooks() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    console.log(user, 'inside');

    const signInGoogle = () => {
        dispatch(signInWithGoogleAsync());
    };

    const signOut = () => {
        dispatch(signOutAsync());
    };

    return [user, signInGoogle, signOut, dispatch];
}

export default useCustomAuthHooks;
