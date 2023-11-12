import React from 'react';
import './App.css';
import TodoWrapper from './ToDoList/TodoWrapper';
import useCustomAuthHooks from '../hooks/CustomAuthHooks';
import { CustomAuthHooksType } from './ToDoList/types';
import AuthSection from './Authentification/AuthSection';

function App(): JSX.Element {
    const [
        user,
        isLoaded,
        signInGoogle,
        signOutCurrentUser,
    ]: CustomAuthHooksType = useCustomAuthHooks();

    return (
        <div className="p-4">
            <div className="fixed top-0 right-0 m-4 flex items-center space-x-2">
                {isLoaded ? (
                    <p> Loading... </p>
                ) : (
                    <AuthSection
                        user={user}
                        signInGoogle={signInGoogle}
                        signOutCurrentUser={signOutCurrentUser}
                    />
                )}
            </div>
            {user ? <TodoWrapper /> : null}
        </div>
    );
}

export default App;
