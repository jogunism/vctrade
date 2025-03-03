<template>
  <div class="mx-auto max-w-(--breakpoint-2xl) md:p-6">
    <!-- header -->
    <div class="sm:py-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-0">
      <div class="self-center flex">
        <p class="text-3xl font-medium dark:text-white/90">User List</p>
        <span class="pl-2 self-end text-lg dark:text-white/90 font-bold">
          ( {{ userList.length }} )
        </span>
        <button
          class="px-2 py-1 ml-3 bg-gray-500 text-white rounded-lg cursor-pointer"
          :disabled="isLoading"
          @click="handleResetButtonClick"
        >
          <ReloadIcon />
        </button>
      </div>
      <div class="flex justify-start sm:justify-end">
        <FavoriteFilter />
        <Dropdown
          class="mr-1 w-25"
          :id="'gender'"
          :title="'Gender'"
          :list="genderList"
        />
        <Searchbox />
      </div>
    </div>
    <!-- ./header -->
    <!-- body -->
    <div
      class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <div class="max-w-full overflow-x-auto">
        <table class="min-w-full">
          <!-- table header -->
          <thead class="hidden sm:table-header-group">
            <tr class="border-b dark:border-gray-800 dark:bg-gray-800">
              <th class="px-5 py-3"></th>
              <th class="px-5 py-3">
                <div class="flex items-center">
                  <p class="font-medium dark:text-gray-400">User</p>
                </div>
              </th>
              <th class="px-5 py-3 hidden sm:table-cell">
                <div class="flex items-center">
                  <p class="font-medium dark:text-gray-400">Email</p>
                </div>
              </th>
              <th class="px-5 py-3 hidden sm:table-cell">
                <div class="flex items-center">
                  <p class="font-medium dark:text-gray-400">Gender</p>
                </div>
              </th>
            </tr>
          </thead>
          <!-- ./table header -->
          <!-- table body -->
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr v-for="user in userList">
              <td class="pt-6 flex justify-center items-center">
                <FavoriteButton
                  :userId="user.userId"
                  :isFavorite="user.isFavorite ?? false"
                />
              </td>
              <td class="px-5 py-4">
                <div class="flex items-center">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 overflow-hidden rounded-full">
                      <img :src="user.picture.thumbnail" alt="user" />
                    </div>
                    <div>
                      <!-- <span class="block font-medium dark:text-white/90"> -->
                      <span class="inline-flex font-medium dark:text-white/90">
                        {{ user.name.title }}.
                        {{ user.userName }}
                      </span>
                      <span
                        class="sm:hidden inline-flex text-gray-500 text-theme-xs dark:text-gray-400 ml-2"
                      >
                        <small>( {{ displayGenderForSM(user.gender) }} )</small>
                      </span>
                      <span
                        class="block text-gray-500 text-theme-xs dark:text-gray-400"
                        v-if="user.tags?.length > 0"
                      >
                        {{ user.tags }}
                      </span>
                      <span
                        class="block text-gray-500 text-theme-xs dark:text-gray-400 sm:hidden"
                      >
                        {{ user.email }}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4 hidden sm:table-cell">
                <div class="flex items-center">
                  <p class="dark:text-gray-400">{{ user.email }}</p>
                </div>
              </td>
              <td class="px-5 py-4 hidden sm:table-cell">
                <div class="flex items-center">
                  <p class="dark:text-gray-400">
                    {{ displayGender(user.gender) }}
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td
                colspan="4"
                class="p-5 text-center self-center text-bold dark:text-gray-200"
              >
                <button
                  class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 cursor-pointer"
                  @click="handleMoreButtonClick"
                  :disabled="isLoading"
                >
                  {{ isLoading ? "LOADING..." : "More results" }}
                </button>
              </td>
            </tr>
          </tbody>
          <!-- ./table body -->
        </table>
      </div>
    </div>
    <!-- ./body -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
// UI Components
import FavoriteFilter from "@components/common/FavoriteFilter.vue";
import Dropdown from "@components/common/Dropdown.vue";
import Searchbox from "@components/common/Searchbox.vue";
import FavoriteButton from "@components/common/FavoriteButton.vue";
import ReloadIcon from "@icons/Reload.vue";
// Utils
import { capitalizeFirstLetter } from "@utils/string.utils";

export default Vue.extend({
  name: "user_list",
  computed: {
    ...mapGetters({
      isLoading: "user/isLoading",
      userList: "user/userList",
      filter: "user/filter",
    }),
  },
  components: {
    FavoriteFilter,
    Dropdown,
    Searchbox,
    FavoriteButton,
    ReloadIcon,
  },
  mounted() {
    if (this.userList.length < 1) {
      this.fetchUserList();
    }
  },
  data() {
    return {
      search: {
        results: 25,
      },
      genderList: ["All", "Male", "Female"],
      favoriteList: ["All", "Favorite"],
    };
  },
  methods: {
    fetchUserList() {
      this.$store.dispatch("user/fetchUserList", this.$data.search);
    },
    handleResetButtonClick() {
      this.$store.dispatch("user/resetUserList", this.$data.search);
    },
    handleMoreButtonClick() {
      this.fetchUserList();
    },

    displayGender(gender: string): String {
      return capitalizeFirstLetter(gender);
    },
    displayGenderForSM(gender: string) {
      return gender === "male" ? "M" : "F";
    },
  },
});
</script>
