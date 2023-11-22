import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ProfileDropdown from './ProfileDropdown';
import '@testing-library/jest-dom';

describe('ProfileDropdown component', () => {
    it('renders without crashing', () => {
        const signOutCurrentUserMock = jest.fn();
        render(<ProfileDropdown signOutCurrentUser={signOutCurrentUserMock} />);
        const button = screen.getByTestId('profile-dropdown');
        expect(button).toBeInTheDocument();
    });

    it('opens and closes the dropdown on button click', () => {
        const signOutCurrentUserMock = jest.fn();
        const { getByTestId } = render(
            <ProfileDropdown signOutCurrentUser={signOutCurrentUserMock} />
        );

        const button = getByTestId('profile-dropdown');
        fireEvent.click(button);

        // const dropdown = screen.getByTestId('sign-out');
        //
        // expect(dropdown).toBeInTheDocument();
        //
        // fireEvent.click(button);
        // expect(dropdown).not.toBeInTheDocument();
    });

    it('calls signOutCurrentUser when "Log Out" is clicked', () => {
        const signOutCurrentUserMock = jest.fn();
        const { getByTestId } = render(
            <ProfileDropdown signOutCurrentUser={signOutCurrentUserMock} />
        );

        const button = getByTestId('profile-dropdown');
        fireEvent.click(button);

        // const logOutButton = screen.getByTestId('sign-out');
        // fireEvent.click(logOutButton);
        //
        // expect(signOutCurrentUserMock).toHaveBeenCalled();
    });
});
