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
      <div class="p-5 max-w-full overflow-x-auto h-200">
        <div>
          <p>
            <a
              :class="[
                'mr-3 text-white text-md cursor-pointer',
                currentType === 'country'
                  ? 'border border-gray-500 px-4 py-3 rounded-lg text-xl font-bold'
                  : '',
              ]"
              @click="drawChart('country')"
            >
              Country
            </a>
            <a
              :class="[
                'mr-3 text-white text-md cursor-pointer',
                currentType === 'gender'
                  ? 'border border-gray-500 px-4 py-3 rounded-lg text-xl font-bold'
                  : '',
              ]"
              @click="drawChart('gender')"
            >
              Gender
            </a>
            <a
              :class="[
                'mr-3 text-white text-md cursor-pointer',
                currentType === 'age'
                  ? 'border border-gray-500 px-4 py-3 rounded-lg text-xl font-bold'
                  : '',
              ]"
              @click="drawChart('age')"
            >
              Age
            </a>
            <a
              :class="[
                'mr-3 text-white text-md cursor-pointer',
                currentType === 'tags'
                  ? 'border border-gray-500 px-4 py-3 rounded-lg text-xl font-bold'
                  : '',
              ]"
              @click="drawChart('tags')"
            >
              Tags
            </a>
          </p>
        </div>
        <div class="p-10 w-full h-full">
          <Pie :data="data" :options="options" />
        </div>
      </div>
    </div>
    <!-- ./body -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

export default Vue.extend({
  name: "user_list",
  computed: {
    ...mapGetters({
      data: "chart/chartData",
    }),
  },
  components: {
    Pie,
  },
  watch: {
    chartData(newData) {
      if (newData && newData.datasets && newData.datasets.length > 0) {
        console.log("Chart data updated:", newData);
      } else {
        console.warn("No chart data available yet.");
      }
    },
  },
  mounted() {
    this.$store.dispatch("chart/loadUserListOrigin").then(() => {
      this.drawChart("country");
    });
  },
  data() {
    return {
      currentType: "country",
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              padding: 30,
              color: "#E5E6E8",
              font: {
                size: 12,
              },
            },
          },
        },
      },
    };
  },
  methods: {
    drawChart(type: string) {
      this.currentType = type;
      this.$store.dispatch("chart/drawChart", type);
    },
  },
});
</script>
