import React, { useState } from 'react';
import { ProfileDropdownType } from '../ToDoList/types';
import StyledBurger from '../../assets/icons/StyledBurger';

function ProfileDropdown(props: ProfileDropdownType) {
    const { signOutCurrentUser } = props;
    const [isOpen, setIsOpen] = useState(false);
    const handleLogout = () => {
        signOutCurrentUser();
        window.location.reload();
    };

    return (
        <div className="relative inline-block text-right">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center text-white focus:outline-none"
            >
                <StyledBurger />
            </button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        role="menuitem"
                    >
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;
