import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthSection from './AuthSection';
import '@testing-library/jest-dom';

describe('AuthSection component', () => {
    const signInGoogle = jest.fn();
    const signOutCurrentUser = jest.fn();

    it('renders sign-in button when user is not authenticated', () => {
        render(
            <AuthSection
                user={null}
                signInGoogle={signInGoogle}
                signOutCurrentUser={signOutCurrentUser}
            />
        );
        const signInButton = screen.getByText('Sign in with Google');
        expect(signInButton).toBeInTheDocument();
    });

    xit('renders profile dropdown when user is authenticated', () => {
        render(<div />);
        const profileDropdown = screen.getByTestId('profile-dropdown');
        expect(profileDropdown).toBeInTheDocument();
    });

    it('calls signInGoogle function when sign-in button is clicked', () => {
        render(
            <AuthSection
                user={null}
                signInGoogle={signInGoogle}
                signOutCurrentUser={signOutCurrentUser}
            />
        );
        const signInButton = screen.getByText('Sign in with Google');
        fireEvent.click(signInButton);
        expect(signInGoogle).toHaveBeenCalled();
    });
});
