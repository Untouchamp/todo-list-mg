import React from 'react';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import StylizedButton from '../../StylizedElements/StylizedButton/StylizedButton';
import { AuthSectionType } from '../../ToDoList/types';

function AuthSection(props: AuthSectionType): JSX.Element {
    const { user, signInGoogle, signOutCurrentUser } = props;
    if (user) {
        return <ProfileDropdown signOutCurrentUser={signOutCurrentUser} />;
    }
    return (
        <StylizedButton
            clickHandler={signInGoogle}
            buttonDescription="Sign in with Google"
        />
    );
}

export default AuthSection;
