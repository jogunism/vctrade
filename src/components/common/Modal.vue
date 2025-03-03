<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
  >
    <div
      class="bg-gray-100 rounded-lg shadow-lg w-full sm:w-full md:w-3/4 lg:w-1/2 xl:w-3/4 flex flex-col justify-between h-auto"
      style="margin-top: -20vh"
    >
      <!-- Header Section -->
      <div class="p-3">
        <h3 class="text-xl font-semibold">{{ title }}</h3>
      </div>
      <!-- Content Section -->
      <div class="p-3 flex-grow">
        <slot></slot>
      </div>
      <!-- Footer Section -->
      <div class="p-3 flex justify-end">
        <button
          @click="close"
          class="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "modal",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Title", // Default title if none is provided
    },
  },
  mounted() {},
  methods: {
    close() {
      this.$emit("update:visible", false); // Emits event to hide modal
    },
  },
});
</script>
