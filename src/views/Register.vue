<template>
  <AuthForm
    title="Create Your FireBlog Account"
    linkHeader="Already have an account?"
    :error="error"
    :errorMsg="errorMsg"
    @sign-in="register"
  >
    <template #link>
      <router-link class="router-link" :to="{ name: 'Login' }"
        >Login</router-link
      >
    </template>
    <template #inputs>
      <div class="input">
        <input type="text" placeholder="First Name" v-model="firstName" />
        <img :src="userIcon" alt="First Name" class="icon" />
      </div>

      <div class="input">
        <input type="text" placeholder="Last Name" v-model="lastName" />
        <img :src="userIcon" alt="Last Name" class="icon" />
      </div>

      <div class="input">
        <input type="text" placeholder="Username" v-model="username" />
        <img :src="userIcon" alt="Username" class="icon" />
      </div>

      <div class="input">
        <input type="text" placeholder="Email" v-model="email" />
        <img :src="emailIcon" alt="Email" class="icon" />
      </div>

      <div class="input">
        <input type="password" placeholder="Password" v-model="password" />
        <img :src="passwordIcon" alt="password" class="icon" />
      </div>
    </template>
  </AuthForm>
</template>

<script>
import { ref } from "vue";
import { useAuth } from "../hooks/useAuth";

import AuthForm from "../components/Form/AuthForm";

import { envelopeRegular as emailIcon } from "../assets/Icons/envelope-regular";
import { lockAltSolid as passwordIcon } from "../assets/Icons/lock-alt-solid";
import { userAltLight as userIcon } from "../assets/Icons/user-alt-light";

export default {
  name: "Login",
  components: {
    AuthForm,
  },
  setup() {
    const firstName = ref(null);
    const lastName = ref(null);
    const username = ref(null);
    const email = ref(null);
    const password = ref(null);

    const { error, errorMsg, signUp } = useAuth();

    const register = async () =>
      signUp(
        email.value,
        password.value,
        firstName.value,
        lastName.value,
        username.value
      );

    return {
      firstName,
      lastName,
      username,
      email,
      password,
      error,
      errorMsg,

      register,

      emailIcon,
      passwordIcon,
      userIcon,
    };
  },
};
</script>


<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>