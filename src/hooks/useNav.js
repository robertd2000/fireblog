import { ref, onMounted } from "vue";

export const useNav = () => {
  onMounted(() => {
    window.addEventListener("resize", checkScreen);
    checkScreen();
  });

  const mobile = ref(null);
  const mobileNav = ref(null);
  const windoWidth = ref(null);

  const checkScreen = () => {
    windoWidth.value = window.innerWidth;

    if (windoWidth.value <= 750) {
      mobile.value = true;
      return;
    }
    mobile.value = false;
    mobileNav.value = false;
    return;
  };

  const toggleMobileNav = () => {
    mobileNav.value = !mobileNav.value;
  };

  const profile = ref(null);
  const profileMenu = ref(null);

  const toggleProfileMenu = (e) => {
    if (e.target === profile.value) {
      profileMenu.value = !profileMenu.value;
    }
  };

  return {
    mobile,
    mobileNav,
    windoWidth,
    profile,
    profileMenu,

    toggleMobileNav,
    toggleProfileMenu
  };
};
