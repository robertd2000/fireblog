<template>
  <Editor
    :storeHandler="storeHandler"
    @handler="updateBlog"
    :routeID="routeID"
    :error="error"
    :errorMsg="errorMsg"
    :loading="loading"
    :imageHandler="imageHandler"
  >
    Save Changes
  </Editor>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import { usePost } from "../hooks/usePost";
import Editor from "../components/Blog/Editor";

export default {
  name: "EditBlog",
  components: { Editor },
  setup() {
    const store = useStore();
    const route = useRoute();

    const routeID = ref(null);
    const currentBlog = ref(null);

    onMounted(async () => {
      routeID.value = route.params.blogid;
      currentBlog.value = store.state.blog.blogPosts.filter(
        (post) => post.blogID === routeID.value
      );

      store.commit("blog/setBlogState", currentBlog.value[0]);
    });

    const storeHandler = () => {
      return store.dispatch("blog/updatePost", routeID.value);
    };

    const { error, errorMsg, loading, imageHandler, updateBlog } = usePost();

    return {
      storeHandler,
      updateBlog,
      routeID,
      error,
      errorMsg,
      loading,
      imageHandler,
    };
  },
};
</script>

<style scoped>
</style>