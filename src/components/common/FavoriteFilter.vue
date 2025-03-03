<template>
  <button
    class="px-2 py-1 mr-1 bg-gray-100 rounded-lg cursor-pointer"
    @click="toggleFavoriteFilter"
  >
    <SparklesIcon v-if="!hasFavoriteFilter" />
    <YellowSolid v-else />
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
// UI Components
import SparklesIcon from "@icons/Sparkles.vue";
import YellowSolid from "@icons/YellowSolid.vue";

export default Vue.extend({
  name: "favorite_button",
  props: {},
  components: {
    SparklesIcon,
    YellowSolid,
  },
  computed: {
    ...mapGetters({
      filter: "user/filter",
    }),
  },
  watch: {
    filter(newFilter) {
      this.hasFavoriteFilter = newFilter.favorite;
    },
  },
  data() {
    return {
      hasFavoriteFilter: false,
    };
  },
  mounted() {
    this.hasFavoriteFilter = this.filter?.favorite ?? false;
  },
  methods: {
    toggleFavoriteFilter() {
      this.$store.dispatch("user/filterUserList", {
        id: "favorite",
        value: (!this.hasFavoriteFilter).toString(),
      });
    },
  },
});
</script>
