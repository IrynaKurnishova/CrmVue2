import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default {
  actions: {
    // eslint-disable-next-line no-unused-vars
    async login({ dispatch, commit }, { email, password }) {
      // eslint-disable-next-line no-useless-catch
      try {
        await signInWithEmailAndPassword(getAuth(), email, password);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      // eslint-disable-next-line no-useless-catch
      try {
        await createUserWithEmailAndPassword(getAuth(), email, password);
        const uid = await dispatch("getUid");
        const userRef = ref(getDatabase(), `/users/${uid}/info`);
        await set(userRef, {
          bill: 10000,
          name,
        });
        // await getDatabase().ref(`/users/${uid}/info`).set({
        //   bill: 10000,
        //   name,
        // });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    getUid() {
      const user = getAuth().currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      await getAuth().signOut();
      commit("clearInfo");
    },
  },
};
