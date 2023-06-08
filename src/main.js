import Vue from "vue";
import { Vuelidate } from "vuelidate";
import Paginate from "vuejs-paginate";
import VueMeta from "vue-meta";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";
import tooltipDirective from "@/directives/tooltip.directive";
import messagePlugin from "@/utils/message.plugin";
import titlePlugin from "@/utils/title.plugin";
import Loader from "@/components/app/Loader.vue";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);

Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.filter("localize", localizeFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

const firebaseConfig = {
  apiKey: "AIzaSyDoYjYja5Q0wVUtzrDcOWBj9FQ4ez4Ef0o",
  authDomain: "crm-project-68911.firebaseapp.com",
  projectId: "crm-project-68911",
  storageBucket: "crm-project-68911.appspot.com",
  messagingSenderId: "978147731131",
  appId: "1:978147731131:web:990b022ae3f141a75aab9e",
  measurementId: "G-LT5TPZNWP5",
};
initializeApp(firebaseConfig);

let app;
getAuth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
