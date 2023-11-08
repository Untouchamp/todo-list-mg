import React from 'react';
import authenticationService from '../../services/authenticationService/AuthenticationService';

function GoogleSignIn(): JSX.Element {
    const handleGoogleSignIn = async () => {
        authenticationService.signInWithGoogle();
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
