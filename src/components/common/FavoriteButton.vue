<template>
  <button class="cursor-pointer" @click="toggleFavorite">
    <YellowSolid v-if="isFavorite" />
    <YellowOutline v-else />
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import YellowOutline from "@icons/YellowOutline.vue";
import YellowSolid from "@icons/YellowSolid.vue";

export default Vue.extend({
  name: "favorite_button",
  props: {
    userId: {
      type: String,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    YellowOutline,
    YellowSolid,
  },
  methods: {
    toggleFavorite() {
      if (!this.$props.userId) {
        //TODO - Show error
        return;
      }
      this.$store.dispatch("user/toggleFavorite", this.$props.userId);
    },
  },
});
</script>
