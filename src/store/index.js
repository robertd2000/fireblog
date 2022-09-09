import { createStore } from "vuex";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query
} from "firebase/firestore";
import { projectFirestore } from "../firebase/firebaseInit";
import profile from "./modules/profile";
import blog from "./modules/blog";

export default createStore({
  // state: {
  //   blogPosts: [],
  //   postLoaded: null,
  //   blogHTML: "Write your blog title here...",
  //   blogTitle: "",
  //   blogPhotoName: "",
  //   blogPhotoFileURL: null,
  //   blogPhotoPreview: null,
  //   editPost: null
  // },
  // getters: {
  //   blogPostsFeed(state) {
  //     return state.blogPosts.slice(0, 2);
  //   },
  //   blogPostsCards(state) {
  //     return state.blogPosts.slice(2, 6);
  //   }
  // },
  // mutations: {
  //   neBlogPost(state, payload) {
  //     state.blogHTML = payload;
  //   },
  //   updateBloTitle(state, payload) {
  //     state.blogTitle = payload;
  //   },
  //   fileNameChange(state, payload) {
  //     state.blogPhotoName = payload;
  //   },
  //   openPhotoPreview(state) {
  //     state.blogPhotoPreview = !state.blogPhotoPreview;
  //   },
  //   createFileUrl(state, payload) {
  //     state.blogPhotoFileURL = payload;
  //   },
  //   toggleEditPost(state, payload) {
  //     state.editPost = payload;
  //   },
  //   setBlogState(state, payload) {
  //     state.blogTitle = payload.blogTitle;
  //     state.blogHTML = payload.blogHTML;
  //     state.blogPhotoFileURL = payload.blogCoverPhoto;
  //     state.blogPhotoName = payload.blogCoverPhotoName;
  //   },
  //   filterBlogPost(state, payload) {
  //     state.blogPosts = state.blogPosts.filter(
  //       (post) => post.blogID !== payload
  //     );
  //   }
  // },
  // actions: {
  //   async getPost({ state }) {
  //     const docRef = query(
  //       collection(projectFirestore, "blogPosts"),
  //       orderBy("date", "desc")
  //     );

  //     const querySnapshot = await getDocs(docRef);
  //     querySnapshot.forEach((doc) => {
  //       if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
  //         const data = {
  //           blogID: doc.data().blogID,
  //           blogHTML: doc.data().blogHTML,
  //           blogCoverPhoto: doc.data().blogCoverPhoto,
  //           blogTitle: doc.data().blogTitle,
  //           blogDate: doc.data().date,
  //           blogCoverPhotoName: doc.data().blogCoverPhotoName
  //         };
  //         state.blogPosts.push(data);
  //       }
  //     });
  //     state.postLoaded = true;
  //   },
  //   async updatePost({ commit, dispatch }, payload) {
  //     commit("filterBlogPost", payload);
  //     await dispatch("getPost");
  //   },
  //   async deletePost({ commit }, payload) {
  //     const postRef = doc(projectFirestore, "blogPosts", payload);
  //     await deleteDoc(postRef);
  //     commit("filterBlogPost", payload);
  //   }
  // },
  modules: {
    profile,
    blog
  }
});
