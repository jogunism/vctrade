import { User } from "@src/constants";

export const colors = [
  "#B71C1C", //Very Dark Red
  "#D84315", //Deep Dark Orange
  "#F57F17", //Dark Mustard Yellow
  "#2C6B2F", //Dark Olive Green
  "#1565C0", //Deep Blue
  "#6A1B9A", //Deep Purple
  "#E65100", //Dark Burnt Orange
  "#004D40", //Deep Teal
  "#880E4F", //Dark Fuchsia Pink
  "#1E88E5", //Medium Dark Blue
  "#AD1457", //Very Dark Pink
  "#37474F", //Charcoal Dark Gray
  "#FF8F00", //Dark Amber
  "#0288D1", //Deep Blue
  "#8E24AA", //Dark Purple
  "#6A1B9A", //Very Dark Violet
  "#BF360C", //Dark Red-Orange
  "#4A148C", //Very Dark Violet Purple
  "#2E7D32", //Very Dark Lime Green
  "#D32F2F", //Dark Crimson Red
];

export const getNationality = (
  users: Array<User>
): { natList: string[]; natPercentages: number[] } => {
  const totalUsers = users.length;
  const natCount: Record<string, number> = {};

  // Count users country
  users.forEach((user) => {
    if (!user.nat) {
      return;
    }
    natCount[user.nat] = (natCount[user.nat] || 0) + 1;
  });

  // List countries and calculate percentages
  const natList = Object.keys(natCount);
  const natPercentages = natList.map((nat) =>
    parseFloat(((natCount[nat] / totalUsers) * 100).toFixed(1))
  );

  // Should all sum value 100%
  const sum = natPercentages.reduce((acc, curr) => acc + curr, 0);
  const adjustedPercentages = natPercentages.map(
    (percentage) => (percentage / sum) * 100
  );

  // console.log(natList);
  // console.log(adjustedPercentages);
  return { natList, natPercentages: adjustedPercentages };
};

export const getGender = (
  users: Array<User>
): { genderList: string[]; genderPercentages: number[] } => {
  const totalUsers = users.length;
  const genderCount: Record<string, number> = {};

  // Count gender
  users.forEach((user) => {
    if (!user.gender) {
      return;
    }
    genderCount[user.gender] = (genderCount[user.gender] || 0) + 1;
  });

  const genderList = Object.keys(genderCount);
  const genderPercentages = genderList.map((gender) =>
    parseFloat(((genderCount[gender] / totalUsers) * 100).toFixed(1))
  );

  // Should all sum value 100%
  const sum = genderPercentages.reduce((acc, curr) => acc + curr, 0);
  const adjustedPercentages = genderPercentages.map(
    (percentage) => (percentage / sum) * 100
  );

  // console.log(genderList);
  // console.log(adjustedPercentages);
  return { genderList, genderPercentages: adjustedPercentages };
};

export const getAgeGroup = (
  users: Array<User>
): { ageGroups: string[]; agePercentages: number[] } => {
  const totalUsers = users.length;
  const ageCount: Record<string, number> = {};

  // Ages seperations of 5 year
  users.forEach((user) => {
    const age = user.registered?.age ?? -1;
    if (age < 0) {
      return;
    }
    const ageGroup = `${Math.floor(age / 5) * 5}-${
      Math.floor(age / 5) * 5 + 4
    }`;

    ageCount[ageGroup] = (ageCount[ageGroup] || 0) + 1;
  });

  const ageGroups = Object.keys(ageCount);
  const agePercentages = ageGroups.map((ageGroup) =>
    parseFloat(((ageCount[ageGroup] / totalUsers) * 100).toFixed(1))
  );

  // Should all sum value 100%
  const sum = agePercentages.reduce((acc, curr) => acc + curr, 0);
  const adjustedPercentages = agePercentages.map(
    (percentage) => (percentage / sum) * 100
  );

  // console.log(ageGroups);
  // console.log(adjustedPercentages);
  return { ageGroups, agePercentages: adjustedPercentages };
};

export const getTags = (
  users: Array<User>
): { tags: string[]; tagPercentages: number[] } => {
  const totalUsers = users.length;
  const tagCount: Record<string, number> = {};

  // Count all user's tags
  users.forEach((user) => {
    user.tags?.forEach((tag) => {
      // console.log(`${user.userName}, ${tag}`);
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  const tags = Object.keys(tagCount);

  // Calculate each tag's percentages
  const tagPercentages = tags.map((tag) =>
    parseFloat(((tagCount[tag] / totalUsers) * 100).toFixed(1))
  );

  // Ensure all sum up to 100%
  const sum = tagPercentages.reduce((acc, curr) => acc + curr, 0);
  const adjustedPercentages = tagPercentages.map((percentage) =>
    parseFloat(((percentage / sum) * 100).toFixed(1))
  );

  // console.log(tags);
  // console.log(adjustedPercentages);
  return { tags, tagPercentages: adjustedPercentages };
};
