<template>
  <header class="header-container">
    <div class="content-wrapper">
      <select
        id="country"
        class="select"
        v-model="selectedCountry"
        @change="updateSelectedCountry"
      >
        <option value="">Select a country</option>
        <option
          v-for="country in countries"
          :key="country.code"
          :value="country.code"
        >
          {{ country.name }}
        </option>
      </select>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { COUNTRY_LIST } from "../shared/constants";

export default {
  data() {
    return {
      countries: COUNTRY_LIST,
      selectedCountry: "",
    };
  },
  computed: {
    ...mapGetters(["getSelectedCountry"]),
  },
  methods: {
    ...mapMutations(["SET_SELECTED_COUNTRY"]),
    ...mapActions(["fetchNews", "resetPage"]),
    updateSelectedCountry() {
      this.SET_SELECTED_COUNTRY(this.selectedCountry);
      this.resetPage();
      this.fetchNews();
    },
  },
};
</script>

<style scoped>
.header-container {
  background-color: #a8a8a8;
}
.content-wrapper {
  width: 85%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.country-select {
  text-align: right;
  margin-right: 20px;
}

.select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
  margin: 20px 0;
  background-color: #fff;
  cursor: pointer;
}
</style>
