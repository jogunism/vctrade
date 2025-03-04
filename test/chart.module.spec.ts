import module from "../src/store/modules/chart.module";
import { User, ChartState, ChartDataset, ChartData } from "../src/constants";

describe("Chart Store Mutations", () => {
  let state: ChartState;

  beforeEach(() => {
    state = {
      userListOrigin: [
        {
          userId: "ryan.kumar",
          email: "ryan.kumar@example.com",
          gender: "male",
          nat: "US",
          registered: {
            age: 24,
          },
          tags: ["tag1", "tag2"],
        },
        {
          userId: "rose.woods",
          email: "rose.woods@example.com",
          gender: "female",
          nat: "DE",
          registered: {
            age: 32,
          },
          tags: ["tag1", "tag4"],
        },
        {
          userId: "filipe.kappert",
          email: "filipe.kappert@example.com",
          gender: "male",
          nat: "US",
          registered: {
            age: 22,
          },
          tags: ["tag3"],
        },
      ] as Array<User>,
      chartData: {
        labels: [] as Array<string>,
        datasets: [] as Array<ChartDataset>,
      } as ChartData,
    };
  });

  it("should generate dataset for 'country' type", () => {
    module.mutations.makeDataset(state, "country");

    expect(state.chartData.labels).toEqual(["US", "DE"]);
    expect(state.chartData.datasets[0].data).toEqual([66.7, 33.3]);
  });

  it("should generate dataset for 'gender' type", () => {
    module.mutations.makeDataset(state, "gender");

    expect(state.chartData.labels).toEqual(["male", "female"]);
    expect(state.chartData.datasets[0].data).toEqual([66.7, 33.3]);
  });

  it("should generate dataset for 'age' type", () => {
    module.mutations.makeDataset(state, "age");

    expect(state.chartData.labels).toEqual(["20-24", "30-34"]);
  });

  it("should generate dataset for 'tags' type", () => {
    module.mutations.makeDataset(state, "tags");

    expect(state.chartData.labels).toEqual(["tag1", "tag2", "tag4", "tag3"]);
    expect(state.chartData.datasets[0].data).toEqual([40, 20, 20, 20]);
  });
});
