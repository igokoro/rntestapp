export const getCurrentDay = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const todaysDate = `${month}-${date}-${year}`;
  return todaysDate
}
