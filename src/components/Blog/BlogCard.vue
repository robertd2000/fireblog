<template>
  <div class="blog-card">
    <div class="icons" v-show="editPost">
      <BlogIcon @handler="editBlog" :icon="editRegular" />
      <BlogIcon @handler="deletePost" :icon="trashRegular" />
    </div>
    <img class="image" :src="post.blogCoverPhoto" alt="" />
    <div class="info">
      <h4>{{ post.blogTitle }}</h4>
      <h6>
        Posted on
        {{ blogDate }}
      </h6>
      <BlogLink :link="{ name: 'ViewBlog', params: { blogid: post.blogID } }"
        >View The Post</BlogLink
      >
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import { useRouter } from "vue-router";
import { dateFormater } from "../../utils/date";

import BlogLink from "./BlogLink";
import BlogIcon from "./BlogIcon";

import { arrowRightL } from "../../assets/Icons/arrowRightLight";
import { editRegular } from "../../assets/Icons/edit-regular";
import { trashRegular } from "../../assets/Icons/trash-regular";
import { stock1 as photo } from "../../assets/blogCards/stock-1";

export default {
  name: "BlogCard",
  props: ["post"],
  components: {
    BlogLink,
    BlogIcon,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const deletePost = () => {
      store.dispatch("blog/deletePost", props.post.blogID);
    };

    const editBlog = () => {
      router.push({
        name: "EditBlog",
        params: {
          blogid: props.post.blogID,
        },
      });
    };

    return {
      arrowRightL,
      editRegular,
      trashRegular,
      photo,
      editPost: computed(() => store.state.blog.editPost),
      deletePost,
      editBlog,
      blogDate: computed(() => dateFormater(props.post.blogDate)),
    };
  },
};
</script>


<style lang="scss" scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  min-height: 420px;
  transition: 0.5s ease all;
  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;
  }
  .image {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }
  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000;
    h4 {
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: 300;
    }
    h6 {
      font-weight: 400;
      font-size: 12px;
      padding-bottom: 16px;
    }
    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      padding-top: 20px;
      font-size: 12px;
      padding-bottom: 4px;
      transition: 0.5s ease-in all;
      &:hover {
        color: rgba(48, 48, 48, 0.8);
      }
      .arrow {
        width: 10px;
      }
    }
  }
}
</style>