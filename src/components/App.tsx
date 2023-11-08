import React from 'react';
import './App.css';
import TodoWrapper from './ToDoList/TodoWrapper';
import GoogleSignIn from './Authentification/GoogleSignIn';
import ProfileDropdown from './Authentification/ProfileDropdown';
import useCustomAuthHooks from '../hooks/CustomAuthHooks';
import { CustomAuthHooksType } from './ToDoList/types';

function App(): JSX.Element {
    const [user, signInGoogle, signOutCurrentUser]: CustomAuthHooksType =
        useCustomAuthHooks();

    return (
        <div className="p-4">
            <div className="fixed top-0 right-0 m-4 flex items-center space-x-2">
                {user ? (
                    <ProfileDropdown signOutCurrentUser={signOutCurrentUser} />
                ) : (
                    <GoogleSignIn signInGoogle={signInGoogle} />
                )}
            </div>
            {user ? <TodoWrapper /> : null}
        </div>
    );
}

export default App;
