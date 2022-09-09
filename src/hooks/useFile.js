import { ref } from "vue";
import { useStore } from "vuex";

export const useFile = () => {
  const store = useStore();

  const file = ref(null);
  const blogPhoto = ref(null);

  const fileNameChange = (fileName) =>
    store.commit("blog/fileNameChange", fileName);

  const createFileUrl = () =>
    store.commit("blog/createFileUrl", URL.createObjectURL(file.value));

  const fileChange = () => {
    file.value = blogPhoto.value.files[0];
    const fileName = file.value.name;
    fileNameChange(fileName);
    createFileUrl();
  };

  const openPreview = () => {
    store.commit("blog/openPhotoPreview");
  };

  return {
    openPreview,
    file,
    fileChange,
    blogPhoto
  };
};
