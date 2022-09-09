import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, projectFirestore } from "../../firebase/firebaseInit";
const state = () => ({
  user: null,
  profileAdmin: null,
  profileEmail: null,
  profileFirstName: null,
  profileLastName: null,
  profileUsername: null,
  profileId: null,
  profileInitials: null
});

const getters = {};

const mutations = {
  updateUser(state, payload) {
    state.user = payload;
  },
  setProfileInfo(state, payload) {
    state.profileId = payload.id;
    state.profileEmail = payload.data().email;
    state.profileFirstName = payload.data().firstName;
    state.profileLastName = payload.data().lastName;
    state.profileUsername = payload.data().username;
  },
  setProfileInitials(state) {
    state.profileInitials =
      state.profileFirstName.match(/(\b\S)?/g).join("") +
      state.profileLastName.match(/(\b\S)?/g).join("");
  },
  changeFirstName(state, payload) {
    state.profileFirstName = payload;
  },
  changeLastName(state, payload) {
    state.profileLastName = payload;
  },
  changeUsername(state, payload) {
    state.profileUsername = payload;
  }
};

const actions = {
  async getCurrentUser({ commit }) {
    const userRef = doc(projectFirestore, "users", auth.currentUser.uid);

    const docSnap = await getDoc(userRef);
    commit("setProfileInfo", docSnap);
    commit("setProfileInitials");
  },
  async updateUserSettings({ commit, state }) {
    const userRef = doc(projectFirestore, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      firstName: state.profileFirstName,
      lastName: state.profileLastName,
      username: state.profileUsername
    });
    commit("setProfileInitials");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
