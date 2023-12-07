let eventGuid = 0;
// const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const createEventId = () => {
  return String(eventGuid++);
};

export const INITIAL_EVENTS = [
  {
    id: "11111111",
    title: "Làm test 1",
    start: "2023-08-20",
    end: "2023-08-23",
  },
  { id: "0", title: "ahihi", start: "2023-08-15", end: "2023-08-16" },
];
