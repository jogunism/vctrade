<template>
  <div
    :id="'dropdown_' + id"
    class="relative inline-block text-left h-10 px-2 border border-gray-200 rounded-lg dark:bg-white"
  >
    <button
      type="button"
      class="inline-flex items-center w-full h-full rounded-md text-gray-700 focus:outline-none"
      @click="toggleDropdown"
    >
      {{ currentValue }}
      <ChevronDownIcon class="inline-flex ml-auto" />
    </button>

    <div
      class="dropdown-menu absolute left-0 z-10 mt-1 w-auto origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      v-show="dropdownOpen"
    >
      <ul class="py-1" role="none">
        <li
          v-for="(text, index) in list"
          :key="index"
          :class="
            'text-gray-700 block px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer' +
            (currentValue === text ? ' dark:bg-gray-200' : '')
          "
          role="menuitem"
          @click="handleItemClick(text)"
        >
          {{ text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
// UI Components
import ChevronDownIcon from "@icons/ChevronDown.vue";
// Utils
import { capitalizeFirstLetter } from "@utils/string.utils";
import { UserListFilter } from "@src/constants";

export default Vue.extend({
  name: "dropdown_menu",
  props: {
    id: {
      type: String,
      default: "",
    },
    title: {
      type: String,
    },
    list: {
      type: Array<String>,
      default: [],
    },
  },
  components: {
    ChevronDownIcon,
  },
  computed: {
    ...mapGetters({
      filter: "user/filter",
    }),
  },
  watch: {
    filter(newFilter: UserListFilter) {
      this.currentValue = !newFilter.gender
        ? "Gender"
        : capitalizeFirstLetter(newFilter.gender);
    },
  },
  data() {
    return {
      dropdownOpen: false,
      currentValue: this.$props.title,
    };
  },
  mounted() {
    document.addEventListener("click", this.handleOutsideClick);
    this.currentValue = !this.filter.gender
      ? "Gender"
      : capitalizeFirstLetter(this.filter.gender);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleOutsideClick);
  },

  methods: {
    handleItemClick(text: String) {
      this.toggleDropdown();

      this.$store.dispatch("user/filterUserList", {
        id: this.$props.id,
        value: text.toLowerCase(),
      });
    },

    handleOutsideClick(event: MouseEvent) {
      const dropdownMenu = this.$el.querySelector(
        ".dropdown-menu"
      ) as HTMLElement;
      const button = this.$el.querySelector("button") as HTMLElement;
      // if the clicked element is not dropdownMenu와 or button
      if (
        dropdownMenu &&
        !dropdownMenu.contains(event.target as Node) &&
        !button.contains(event.target as Node)
      ) {
        // if opened the dropdownMenu, close.
        if (this.dropdownOpen) {
          this.toggleDropdown();
        }
      }
    },

    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
  },
});
</script>
