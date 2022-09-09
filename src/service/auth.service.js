import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { auth } from "../firebase/firebaseInit";

export const AuthService = {
  signIn: async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      return result;
    } catch (e) {
      return e.message;
    }
  },
  signUp: async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } catch (e) {
      return e.message;
    }
  },
  signOutAuth: async () => await signOut(auth),
  resetPassword: async (email) => sendPasswordResetEmail(auth, email)
};
