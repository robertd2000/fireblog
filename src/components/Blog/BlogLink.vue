<template>
  <router-link class="link" :class="{ light: light }" :to="link">
    <slot></slot>
    <img :src="arrow" class="arrow" alt="" />
  </router-link>
</template>

<script>
import { arrowRightL as arrow } from "../../assets/Icons/arrowRightLight";

export default {
  name: "BlogLink",
  props: ["link", "light"],
  setup() {
    return {
      arrow,
    };
  },
};
</script>

<style lang='scss'>
.light {
  color: #fff;
}
.link {
  display: inline-flex;
  align-items: center;
  margin-top: 32px;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  transition: 0.5s ease-in all;
  &:hover {
    border-bottom-color: #303030;
  }
}
</style>