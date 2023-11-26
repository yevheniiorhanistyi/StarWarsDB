export const getNumberFromString = (value = "") => {
  const match = value.match(/\d+/);
  return match ? parseInt(match[0], 10) : 1;
};

export default getNumberFromString;
