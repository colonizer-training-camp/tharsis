export const getToday = () => {
  const kst = new Date().toLocaleDateString("sv-SE", {
    timeZone: "Asia/Seoul",
  });
  return kst.slice(2);
};
