import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { User } from 'firebase/auth';
import AuthSection from './AuthSection';
import '@testing-library/jest-dom';

describe('AuthSection component', () => {
    const signInGoogle = jest.fn();
    const signOutCurrentUser = jest.fn();
    const mockUser = { uid: '1' } as User;

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

    it('renders profile dropdown when user is authenticated', () => {
        render(
            <AuthSection
                user={mockUser}
                signInGoogle={signInGoogle}
                signOutCurrentUser={signOutCurrentUser}
            />
        );
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
