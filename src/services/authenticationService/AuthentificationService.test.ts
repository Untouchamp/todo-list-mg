import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import authenticationService from './AuthenticationService';

jest.mock('../firebaseService/FirebaseService', () => ({
    auth: jest.fn(),
    provider: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
    signInWithPopup: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn(),
    User: { id: '1' },
}));

describe('Authentication Service Tests', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Reset mock usage data after each test
    });

    it('signInWithGoogle should return user on successful sign-in', async () => {
        const mockedUser = { uid: 'testUID', email: 'test@example.com' };
        (signInWithPopup as jest.Mock).mockResolvedValue({ user: mockedUser });

        const user = await authenticationService.signInWithGoogle();

        expect(user).toEqual(mockedUser);
    });

    it('signInWithGoogle should handle sign-in failure', async () => {
        const errorMessage = 'Error signing in';
        (signInWithPopup as jest.Mock).mockRejectedValue(
            new Error(errorMessage)
        );

        const user = await authenticationService.signInWithGoogle();

        expect(signInWithPopup).toHaveBeenCalledTimes(1);
        expect(user).toBeNull();
    });

    it('should sign out user', async () => {
        await authenticationService.signOutUser();
        expect(signOut).toHaveBeenCalled();
    });

    it('should listen for auth changes', () => {
        const mockCallback = jest.fn();
        authenticationService.listenForAuthChanges(mockCallback);
        expect(onAuthStateChanged).toHaveBeenCalled();
    });
});
