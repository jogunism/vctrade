<template>
  <div id="main" class="flex h-screen overflow-hidden dark:bg-gray-700">
    <div
      class="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto"
    >
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {};
  },
});
</script>

<style>
@import "tailwindcss";
</style>
