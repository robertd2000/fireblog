<template>
  <div class="reset-password">
    <div class="form-wrap">
      <Modal
        v-if="modalActive"
        @close-modal="closeModal"
        :modalMessage="modalMessage"
      />
      <Loading v-if="loading" />
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="{ name: 'Login' }"
            >Login</router-link
          >
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your passowrd? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <img :src="emailIcon" class="icon" />
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import { useAuth } from "../hooks/useAuth";
import { envelopeRegular as emailIcon } from "../assets/Icons/envelope-regular";

export default {
  name: "ForgotPassword",
  components: { Modal, Loading },
  setup() {
    const {
      email,
      loading,
      modalActive,
      modalMessage,
      resetPassword,
      closeModal,
    } = useAuth();

    return {
      email,
      modalActive,
      loading,
      modalMessage,

      resetPassword,

      closeModal,
      emailIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>