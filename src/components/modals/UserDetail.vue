<template>
  <Modal :visible.sync="isVisible" :title="'User Detail'">
    <div class="grid grid-rows-4 grid-flow-col gap-y-2 gap-x-4 p-2">
      <div class="row-span-4">
        <img :src="user?.picture?.large" class="w-full rounded-lg" />
      </div>
      <div class="row-span-1 col-span-2 space-y-1">
        <h2 class="font-bold">NAME</h2>
        <p>{{ user?.userName }}</p>
      </div>

      <div class="row-span-1 col-span-2 space-y-1">
        <h2 class="font-bold">ID</h2>
        <p>{{ user?.id?.name }} {{ user?.id?.value }}</p>
      </div>
      <div class="row-span-1 col-span-2 space-y-1">
        <h2 class="font-bold">LOCATION</h2>
        <p>
          {{ user?.location?.street?.number }}
          {{ user?.location?.street?.name }} {{ user?.location?.city }}
          {{ user?.location?.state }},
          {{ user?.location?.postcode }}
        </p>
      </div>
      <div class="row-span-1 col-span-2 space-y-1">
        <h2 class="font-bold">PHONE</h2>
        <p>{{ user?.phone }}</p>
      </div>
    </div>
    <div class="p-2">
      <h2 class="font-bold">TAG</h2>
      <div class="py-1">
        <ul class="mb-2 flex flex-wrap gap-2">
          <li
            class="relative pl-3 pr-8 py-1 border border-blue-200 bg-blue-100 rounded-lg"
          >
            <span>#tagtagtagtag</span>
            <button
              class="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-red-700 focus:outline-none cursor-pointer"
              @click="handleTagDeleteButtonClick(1)"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>
          </li>
        </ul>
        <input
          class="w-full p-3 focus:outline-none rounded-lg border"
          type="text"
          placeholder="tag"
          maxlength="30"
          @keyup.enter="handleEnterKeyup"
        />
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import emitter from "@lib/emitter";
// UI components
import Modal from "@components/common/Modal.vue";
import XMarkIcon from "@icons/XMark.vue";
// Constants
import { User } from "@src/constants";

export default Vue.extend({
  name: "favorite_button",
  props: {},
  components: {
    Modal,
    XMarkIcon,
  },
  computed: {
    ...mapGetters({
      currentUser: "user/currentUser",
    }),
  },
  watch: {
    currentUser(user: User) {
      this.user = user;
    },
  },
  data() {
    return {
      isVisible: false,
      user: {} as User,
    };
  },
  mounted() {
    emitter.on("detail_modal", (userId: string) => {
      this.isVisible = true;

      this.$store.dispatch("user/getUserDetail", userId);
    });
  },
  methods: {
    handleEnterKeyup() {
      // todo
    },
    handleTagDeleteButtonClick(index: number) {
      console.log(index);
    },
  },
});
</script>
