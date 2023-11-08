import React, { useState } from 'react';
import { ProfileDropdownType } from '../ToDoList/types';

function ProfileDropdown(props: ProfileDropdownType) {
    const { signOutCurrentUser } = props;
    const [isOpen, setIsOpen] = useState(false);
    const handleLogout = () => {
        signOutCurrentUser();
    };

    return (
        <div className="relative inline-block text-right">
            <div>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center text-white focus:outline-none"
                >
                    <div className="mr-2">User Profile Icon</div>
                </button>
            </div>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;
