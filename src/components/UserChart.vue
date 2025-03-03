<template>
  <div class="mx-auto max-w-(--breakpoint-2xl) md:p-6">
    <!-- link -->
    <a href="/" class="mr-3 text-white text-lg font-bold underline">LIST</a>
    <a href="/chart" class="text-white text-lg font-bold underline">CHART</a>
    <!-- ./link -->
    <!-- header -->
    <div class="sm:py-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-0">
      <div class="self-center flex">
        <p class="text-3xl font-medium dark:text-white/90">Chart</p>
      </div>
    </div>
    <!-- ./header -->
    <!-- body -->
    <div
      class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <div class="p-5 max-w-full overflow-x-auto h-200">BODY</div>
    </div>
    <!-- ./body -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import { mapGetters } from "vuex";

export default Vue.extend({
  name: "user_list",
  mounted() {
    this.$store.dispatch("chart/loadUserListOrigin");
  },
  methods: {
    //
  },
});
</script>
