import { ref } from "vue";

import {
  getStorage,
  ref as firebaseRef,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "vue-router";

import { projectFirestore } from "../firebase/firebaseInit";

export const usePost = () => {
  const storage = getStorage();
  const router = useRouter();

  const error = ref(null);
  const errorMsg = ref(null);
  const loading = ref(null);

  const imageHandler = (file, Editor, cursorLocation, resetUploader) => {
    const docRef = firebaseRef(
      storage,
      `documents/blogPostPhotos/${file.name}`
    );
    const uploadTask = uploadBytesResumable(docRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (err) => {
        console.log(err);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        Editor.insertEmbed(cursorLocation, "image", downloadURL);
        resetUploader();
      }
    );
  };

  const uploadBlog = (
    file,
    blogTitle,
    blogHTML,
    blogPhotoName,
    profileId,
    getPost
  ) => {
    if (blogTitle.length !== 0 && blogHTML.length !== 0) {
      if (file) {
        loading.value = true;
        const storage = getStorage();

        const docRef = firebaseRef(
          storage,
          `documents/BlogCoverPhotos/${blogPhotoName}`
        );

        const uploadTask = uploadBytesResumable(docRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot);
          },
          (err) => {
            console.log(err);
            loading.value = false;
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const timestamp = await Date.now();

            const dataBase = doc(collection(projectFirestore, "blogPosts"));
            await setDoc(dataBase, {
              blogID: dataBase.id,
              blogHTML: blogHTML,
              blogCoverPhoto: downloadURL,
              blogCoverPhotoName: blogPhotoName,
              blogTitle: blogTitle,
              profileId: profileId,
              date: timestamp
            });
            getPost();

            loading.value = false;
            router.push({
              name: "ViewBlog",
              params: { blogid: dataBase.id }
            });
          }
        );
        return;
      }
      error.value = true;
      errorMsg.value = "Please ensure you uploaded a cover photo!";
      setTimeout(() => {
        error.value = false;
      }, 5000);
      return;
    }

    error.value = true;
    errorMsg.value = "Please ensure Blog Title & Blog Post has been filled!";
    setTimeout(() => {
      error.value = false;
    }, 5000);
    return;
  };

  const updateBlog = async (
    file,
    blogTitle,
    blogHTML,
    blogPhotoName,
    routeID,
    updatePost
  ) => {
    const dataBase = doc(projectFirestore, "blogPosts", routeID);

    if (blogTitle.length !== 0 && blogHTML.length !== 0) {
      if (file) {
        loading.value = true;
        const storage = getStorage();

        const docRef = firebaseRef(
          storage,
          `documents/BlogCoverPhotos/${blogPhotoName}`
        );

        const uploadTask = uploadBytesResumable(docRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot);
          },
          (err) => {
            console.log(err);
            loading.value = false;
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            await updateDoc(dataBase, {
              blogHTML: blogHTML,
              blogCoverPhoto: downloadURL,
              blogCoverPhotoName: blogPhotoName,
              blogTitle: blogTitle
            });
            updateBlog();
            loading.value = false;
            router.push({
              name: "ViewBlog",
              params: { blogid: dataBase.id }
            });
          }
        );
        return;
      }

      loading.value = true;
      await updateDoc(dataBase, {
        blogHTML,
        blogTitle
      });
      updatePost();
      loading.value = false;
      router.push({
        name: "ViewBlog",
        params: {
          blogid: dataBase.id
        }
      });
      return;
    }

    error.value = true;
    errorMsg.value = "Please ensure Blog Title & Blog Post has been filled!";
    setTimeout(() => {
      error.value = false;
    }, 5000);
    return;
  };

  return {
    error,
    errorMsg,
    loading,
    imageHandler,
    uploadBlog,
    updateBlog
  };
};
