<template>
  <div @click="handler" class="icon">
    <img :src="icon" class="edit" />
  </div>
</template>

<script>
export default {
  name: "BlogIcon",
  props: ["icon"],
  setup(props, { emit }) {
    const handler = () => emit("handler");

    return {
      handler,
    };
  },
};
</script>

<style lang='scss' scoped>
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #fff;
  transition: 0.5s ease all;
  &:hover {
    background-color: #303030;
    .edit,
    .delete {
      path {
        fill: #fff;
      }
    }
  }
  &:nth-child(1) {
    margin-right: 8px;
  }
  .edit,
  .delete {
    pointer-events: none;
    height: 15px;
    width: auto;
  }
}
</style>