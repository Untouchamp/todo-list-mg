import React, { useEffect } from 'react';
import './App.css';
import TodoWrapper from './ToDoList/TodoWrapper';
import GoogleSignIn from './Authentification/GoogleSignIn';
import ProfileDropdown from './Authentification/ProfileDropdown';
import { listenForAuthChangesHandler } from '../store/AuthSlicer';
import useCustomAuthHooks from '../hooks/CustomAuthHooks';

function App(): JSX.Element {
    const [user, dispatch] = useCustomAuthHooks();

    useEffect(() => {
        listenForAuthChangesHandler(dispatch);
    }, [dispatch]);
    console.log(user);

    return (
        <div className="p-4">
            <div className="fixed top-0 right-0 m-4 flex items-center space-x-2">
                {user ? <ProfileDropdown /> : <GoogleSignIn />}
            </div>
            {user ? <TodoWrapper /> : null}
        </div>
    );
}

export default App;
