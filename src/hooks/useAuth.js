import { ref } from "vue";
import { useRouter } from "vue-router";
import { doc, setDoc } from "firebase/firestore";

import { projectFirestore } from "../firebase/firebaseInit";
import { AuthService } from "../service/auth.service";

export const useAuth = () => {
  const router = useRouter();

  const error = ref(null);
  const errorMsg = ref(null);

  const loading = ref(null);

  const modalActive = ref(null);
  const modalMessage = ref("");

  const signIn = async (email, password) => {
    try {
      await AuthService.signIn(email, password);
      error.value = false;
      errorMsg.value = "";

      router.push({ name: "Home" });
    } catch (e) {
      error.value = true;
      errorMsg.value = e.message;
    }
  };

  const signUp = async (email, password, firstName, lastName, username) => {
    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      username !== ""
    ) {
      error.value = false;
      errorMsg.value = "";

      const authResult = await AuthService.signUp(email, password);
      const userRef = doc(projectFirestore, "users", authResult.user.uid);

      await setDoc(userRef, {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email
      });

      router.push({ name: "Home" });
      return;
    }
    error.value = true;
    errorMsg.value = "Please fill out all the fields!";
    return;
  };

  const signOut = async () => {
    await AuthService.signOutAuth();
    window.location.reload();
  };

  const email = ref(null);

  const resetPassword = async () => {
    loading.value = true;

    try {
      await AuthService.resetPassword(email.value);
      loading.value = false;
      modalMessage.value = "If your account exists, you will receive a email";
      modalActive.value = true;
    } catch (e) {
      modalMessage.value = e.message;
      loading.value = false;
      modalActive.value = true;
    }
  };

  const closeModal = () => {
    modalActive.value = !modalActive.value;
    email.value = "";
  };

  return {
    error,
    errorMsg,
    loading,
    modalActive,
    modalMessage,
    email,
    signIn,
    signUp,
    signOut,
    resetPassword,
    closeModal
  };
};
