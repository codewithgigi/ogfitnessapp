export const formatDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formatdate = new Date(date);
  return formatdate.toLocaleDateString("en-us", options);
};
