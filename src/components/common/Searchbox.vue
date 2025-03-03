<template>
  <div
    class="relative w-full sm:w-70 h-10 pl-2 pr-10 py-1 border border-gray-200 rounded-lg dark:bg-white flex items-center"
  >
    <MagnifyingGlassIcon
      class="absolute left-3.5 top-1/2 transform -translate-y-1/2"
    />
    <input
      class="w-full pl-10 p-3 focus:outline-none"
      type="text"
      placeholder="user name"
      maxlength="30"
      v-model="inputText"
      @keyup.enter="handleEnterKeyup"
    />
    <button
      v-if="inputText"
      @click="clearInput"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent rounded-full p-1 cursor-pointer"
    >
      <XMarkIcon />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
// UI Components
import MagnifyingGlassIcon from "@icons/MagnifyingGlass.vue";
import XMarkIcon from "@icons/XMark.vue";

export default Vue.extend({
  name: "search_box",
  props: {},
  computed: {
    ...mapGetters({
      filter: "user/filter",
    }),
  },
  components: {
    MagnifyingGlassIcon,
    XMarkIcon,
  },
  data() {
    return {
      inputText: "",
    };
  },
  mounted() {
    this.inputText = this.filter?.name ?? "";
  },
  methods: {
    handleEnterKeyup() {
      this.$store.dispatch("user/filterUserList", {
        id: "name",
        value: this.inputText.toLowerCase(),
      });
    },
    clearInput() {
      this.inputText = "";
      this.$store.dispatch("user/filterUserList", {
        id: "name",
        value: "",
      });
    },
  },
});
</script>
