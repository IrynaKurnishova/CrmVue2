import { getDatabase, ref, push, get, child, update } from "firebase/database";
export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const categoryRef = ref(db, `/users/${uid}/categories`);
        const categoriesSnapshot = await get(categoryRef);
        const categories = categoriesSnapshot.val() || {};
        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const categoryRef = ref(db, `/users/${uid}/categories`);
        const childRef = child(categoryRef, id);
        const categoriesSnapshot = await get(childRef);
        const category = categoriesSnapshot.val() || {};
        return { ...category, id };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const categoryRef = await ref(db, `/users/${uid}/categories`);
        await update(child(categoryRef, id), { title, limit });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const categoryRef = ref(db, `/users/${uid}/categories`);
        const newCategory = await push(categoryRef, { title, limit });
        return { title, limit, id: newCategory.key };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
