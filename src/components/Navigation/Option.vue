<template>
  <div class="option">
    <router-link v-if="route" :to="{ name: route }" class="option">
      <img :src="icon" alt="" class="icon" />
      <p>{{ name }}</p>
    </router-link>

    <template v-else>
      <img :src="icon" alt="" class="icon" />
      <p>{{ name }}</p>
    </template>
  </div>
</template>

<script>
export default {
  name: "Option",
  props: ["name", "route", "icon"],
};
</script>

<style lang='scss' scoped>
.option {
  text-decoration: none;
  color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  .icon {
    width: 18px;
    height: auto;
  }
  p {
    font-size: 14px;
    margin-left: 12px;
  }
  &:last-child {
    margin-bottom: 0px;
  }
}
</style>