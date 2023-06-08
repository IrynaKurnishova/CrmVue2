<template>
  <div>
    <div class="page-title">
      <h3>{{ "ProfileTitle" | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required,
          }"
        />
        <label for="description">{{ "Name" | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >{{ "Message_EnterName" | localize }}</small
        >
      </div>

      <div class="switch">
        <label>
          Українська
          <input type="checkbox" v-model="isEnLocale" />
          <span class="lever"></span>
          English
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ "Update" | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
// eslint-disable-next-line no-unused-vars
import localizeFilter from "@/filters/localize.filter";
export default {
  metaInfo() {
    return { title: this.$title("ProfileTitle") };
  },
  data: () => ({
    name: "",
    isEnLocale: true,
  }),
  validations: {
    name: { required },
  },
  mounted() {
    this.name = this.info.name;
    this.isEnLocale = this.info.locale === "en-US";
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    });
  },
  computed: {
    ...mapGetters(["info"]),
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isEnLocale ? "en-US" : "ua-UA",
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
