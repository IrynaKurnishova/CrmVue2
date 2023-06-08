import { get, getDatabase, push, ref, child } from "firebase/database";
export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const categoryRef = ref(db, `/users/${uid}/records`);
        const newRecord = await push(categoryRef, record);
        return newRecord;
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const recordRef = ref(db, `/users/${uid}/records`);
        const recordsSnapshot = await get(recordRef);
        const records = recordsSnapshot.val() || {};
        return Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecordById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const recordRef = ref(db, `/users/${uid}/records`);
        const childRef = child(recordRef, id);
        const recordsSnapshot = await get(childRef);
        const record = recordsSnapshot.val() || {};
        return { ...record, id };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
