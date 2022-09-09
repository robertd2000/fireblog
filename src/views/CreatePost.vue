<template>
  <Editor
    :storeHandler="storeHandler"
    @handler="uploadBlog"
    :error="error"
    :errorMsg="errorMsg"
    :loading="loading"
    :imageHandler="imageHandler"
  >
    Publish Blog
  </Editor>
</template>

<script>
import { useStore } from "vuex";
import { usePost } from "../hooks/usePost";

import Editor from "../components/Blog/Editor";

export default {
  name: "CreatePost",
  components: { Editor },
  setup(props, { emit }) {
    const store = useStore();

    const { error, errorMsg, loading, imageHandler, uploadBlog } = usePost();

    const storeHandler = () => {
      return store.dispatch("blog/getPost");
    };

    return {
      error,
      errorMsg,
      loading,
      imageHandler,
      storeHandler,
      uploadBlog,
    };
  },
};
</script>

<style scoped>
</style>