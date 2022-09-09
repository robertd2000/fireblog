<template>
  <ul :class="{ light: light }">
    <router-link class="link" :to="{ name: 'Home' }"> Home </router-link>
    <router-link class="link" :to="{ name: 'Blogs' }"> Blogs </router-link>
    <router-link v-if="user" class="link" :to="{ name: 'CreatePost' }">
      Create Post
    </router-link>
    <router-link v-if="!user" class="link" :to="{ name: 'Login' }">
      Login/Register
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "NavLinks",
  props: ["user", "light"],
};
</script>

<style lang='scss' scoped>
.light {
  .link {
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    text-decoration: none;
  }
}

ul {
  margin-right: 32px;
  .link {
    margin-top: -10px;
    margin-right: 32px;
  }
  .link:last-child {
    margin-right: 0;
  }
}

.mobile-nav {
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background-color: #303030;
  top: 0;
  left: 0;
  .link {
    padding: 15px 0;
    color: #fff;
  }
}
</style>