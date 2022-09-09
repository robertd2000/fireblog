export const dateFormater = (date) =>
  new Date(date).toLocaleString("en-us", { datestyle: "long" });
