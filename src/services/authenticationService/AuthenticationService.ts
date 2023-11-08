import {
    signInWithPopup,
    onAuthStateChanged,
    User,
    signOut,
} from 'firebase/auth';
import { auth, provider } from '../firebaseService/FirebaseService';

const authenticationService = {
    signInWithGoogle: async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            return result.user;
        } catch (error) {
            console.error('Error updating task:', error);
            return null;
        }
    },

    signOutUser: async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    },

    listenForAuthChanges: (callback: (user: User | null) => void) => {
        onAuthStateChanged(auth, (user) => {
            callback(user);
        });
    },

    getCurrentUserId: (): string | null => {
        const user = auth.currentUser;
        return user ? user.uid : null;
    },
};

export default authenticationService;
