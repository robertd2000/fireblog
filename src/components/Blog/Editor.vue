<template>
  <div class="create-post">
    <BlogCoverPreview v-show="blogPhotoPreview" />
    <Loading v-show="loading" />

    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ errorMsg }}</p>
      </div>

      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            @change="fileChange"
            accept=".png, .jpg, ,jpeg"
          />
          <button
            @click="openPreview"
            class="preview"
            :class="{ 'button-inactive': !blogPhotoFileURL }"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ blogPhotoName }}</span>
        </div>
      </div>

      <div class="editor">
        <VueEditor
          :editorOptions="editorSettings"
          v-model="blogHTML"
          useCustomImageHandler
          @image-added="imageHandler"
        />
      </div>
      <div class="blog-actions">
        <button @click="onHandler"><slot></slot></button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }"
          >Post Preview</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useStore } from "vuex";

import Quill from "quill";
import { ImageResize } from "quill-image-resize-module";
import { VueEditor } from "vue3-editor";

import BlogCoverPreview from "./BlogCoverPreview";
import Loading from "../Loading";
import { useFile } from "../../hooks/useFile";

Quill.register("modules/imageResize", ImageResize);

window.Quill = Quill;

export default {
  name: "Editor",
  props: [
    "storeHandler",
    "routeID",
    "error",
    "errorMsg",
    "loading",
    "imageHandler",
  ],
  components: { VueEditor, Loading, BlogCoverPreview },
  emits: ["handler"],
  setup(props, { emit }) {
    const store = useStore();

    const editorSettings = reactive({
      modules: {
        imageResize: {},
      },
    });

    const { openPreview, file, fileChange, blogPhoto } = useFile();

    const blogTitle = computed({
      get: () => store.state.blog.blogTitle,
      set: (payload) => store.commit("blog/updateBloTitle", payload),
    });
    const blogHTML = computed({
      get: () => store.state.blog.blogHTML,
      set: (payload) => store.commit("blog/neBlogPost", payload),
    });
    const blogPhotoName = computed(() => store.state.blog.blogPhotoName);
    const profileId = computed(() => store.state.profile.profileId);

    const onHandler = () => {
      emit(
        "handler",
        file.value,
        blogTitle.value,
        blogHTML.value,
        blogPhotoName.value,
        props.routeID ? props.routeID : profileId.value,
        props.storeHandler
      );
    };

    return {
      editorSettings,

      blogTitle,
      blogPhotoName,
      blogHTML,
      blogPhotoFileURL: computed(() => store.state.blog.blogPhotoFileURL),
      blogPhotoPreview: computed(() => store.state.blog.blogPhotoPreview),
      onHandler,
      openPreview,

      profileId,
      file,
      blogPhoto,
      fileChange,
    };
  },
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;
  button {
    margin-top: 0;
  }
  .router-button {
    text-decoration: none;
    color: #fff;
  }
  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }
  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }
  // error styling
  .invisible {
    opacity: 0 !important;
  }
  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;
    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
  }
  .blog-info {
    display: flex;
    margin-bottom: 32px;
    input:nth-child(1) {
      min-width: 300px;
    }
    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;
      input {
        display: none;
      }
      .preview {
        margin-left: 16px;
        text-transform: initial;
      }
      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }
  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }
    .ql-editor {
      padding: 20px 16px 30px;
    }
  }
  .blog-actions {
    margin-top: 32px;
    button {
      margin-right: 16px;
    }
  }
}
</style>