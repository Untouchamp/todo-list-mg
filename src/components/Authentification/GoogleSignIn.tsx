import React from 'react';
import { GoogleSignInType } from '../ToDoList/types';

function GoogleSignIn(props: GoogleSignInType): JSX.Element {
    const { signInGoogle } = props;
    const handleGoogleSignIn = () => {
        signInGoogle();
    };

    return (
        <div>
            <button type="button" onClick={handleGoogleSignIn}>
                Sign In with Google
            </button>
        </div>
    );
}

export default GoogleSignIn;
