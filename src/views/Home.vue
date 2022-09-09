<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" v-if="!user" />
    <BlogPost
      v-for="(post, index) in blogPostsFeed"
      :key="index"
      :post="post"
    />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard
            :post="post"
            v-for="(post, index) in blogPostsCards"
            :key="index"
          />
        </div>
      </div>
    </div>

    <div class="updates" v-if="!user">
      <div class="container">
        <h2>never miss a post. Register for your free account today!</h2>
        <BlogLink class="router-button light" :link="{ name: 'Login' }"
          >Register for FireBlogs</BlogLink
        >
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useStore } from "vuex";

import BlogPost from "../components/Blog/BlogPost";
import BlogCard from "../components/Blog/BlogCard";
import BlogLink from "../components/Blog/BlogLink";

import { arrowRightL } from "../assets/Icons/arrowRightLight";

export default {
  name: "Home",
  components: { BlogPost, BlogCard, BlogLink },
  setup() {
    const store = useStore();
    const welcomeScreen = reactive({
      title: "Welcome!",
      blogPost:
        "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
      welcomeScreen: true,
      photo: "coding",
    });

    return {
      welcomeScreen,
      blogPostsFeed: computed(() => store.getters["blog/blogPostsFeed"]),
      blogPostsCards: computed(() => store.getters["blog/blogPostsCards"]),
      user: computed(() => store.state.profile.user),
      arrowRightL,
    };
  },
};
</script>


<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }
    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }
    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>