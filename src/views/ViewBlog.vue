<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <h2>{{ currentBlog[0]?.blogTitle }}</h2>
      <h4>
        Posted on:
        {{ blogDate }}
      </h4>
      <img :src="currentBlog[0]?.blogCoverPhoto" alt="" />
      <div
        class="post-content ql-editor"
        v-html="currentBlog[0]?.blogHTML"
      ></div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { dateFormater } from "../utils/date";

export default {
  name: "ViewBlog",
  setup() {
    const store = useStore();
    const route = useRoute();

    const currentBlog = computed(() =>
      store.state.blog.blogPosts.filter(
        (post) => post.blogID === route.params.blogid
      )
    );

    return {
      currentBlog,
      blogDate: computed(() => dateFormater(currentBlog.value[0]?.blogDate)),
    };
  },
};
</script>

<style lang="scss">
.post-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>