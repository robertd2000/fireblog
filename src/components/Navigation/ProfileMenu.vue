<template>
  <div class="profile" ref="profile" @click="toggleProfileMenu">
    <span>{{ profileInitials }}</span>
    <div v-show="profileMenu" class="profile-menu">
      <div class="info">
        <p class="initials">
          {{ profileInitials }}
        </p>
        <div class="right">
          <p>{{ profileFirstName }} {{ profileLastName }}</p>
          <p>{{ profileUsername }}</p>
          <p>{{ profileEmail }}</p>
        </div>
      </div>
      <div class="options">
        <Option name="Profile" route="Profile" :icon="userIcon" />
        <Option name="Admin" route="Admin" :icon="adminIcon" />
        <Option name="Sign Out" :icon="signOutIcon" @click="signOut" />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

import { useAuth } from "../../hooks/useAuth";
import { useNav } from "../../hooks/useNav";

import Option from "./Option";

import { userAltLight as userIcon } from "../../assets/Icons/user-alt-light";
import { userCrownLight as adminIcon } from "../../assets/Icons/user-crown-light";
import { signOutAltRegular as signOutIcon } from "../../assets/Icons/sign-out-alt-regular";

export default {
  name: "ProfileMenu",
  components: { Option },

  setup(props, { emit }) {
    const store = useStore();

    const { profile, toggleProfileMenu, profileMenu } = useNav();

    const { signOut } = useAuth();

    return {
      profile,
      profileMenu,
      toggleProfileMenu,
      signOut,

      profileInitials: computed(() => store.state.profile.profileInitials),
      profileFirstName: computed(() => store.state.profile.profileFirstName),
      profileLastName: computed(() => store.state.profile.profileLastName),
      profileUsername: computed(() => store.state.profile.profileUsername),
      profileEmail: computed(() => store.state.profile.profileEmail),

      userIcon,
      adminIcon,
      signOutIcon,
    };
  },
};
</script>

<style lang='scss' scoped>
.profile {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  background-color: #303030;
  span {
    pointer-events: none;
  }
  .profile-menu {
    position: absolute;
    top: 60px;
    right: 0;
    width: 250px;
    background-color: #303030;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    .info {
      display: flex;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #fff;
      .initials {
        position: initial;
        width: 40px;
        height: 40px;
        background-color: #fff;
        color: #303030;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
      .right {
        flex: 1;
        margin-left: 24px;
        p:nth-child(1) {
          font-size: 14px;
        }
        p:nth-child(2),
        p:nth-child(3) {
          font-size: 12px;
        }
      }
    }
    .options {
      padding: 15px;
    }
  }
}
@media (max-width: 750px) {
  .profile {
    right: 50px;
  }
}
</style>