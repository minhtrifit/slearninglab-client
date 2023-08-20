export const transformDate = (value: Date) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm: any = today.getMonth() + 1; // Months start at 0!
  let dd: any = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formatted = dd + "/" + mm + "/" + yyyy;

  return formatted;
};

export const transformDate2 = (value: Date) => {
  return value.toISOString().split("T")[0];
};

export const reformatDate = (dateStr: any) => {
  const d = new Date();
  const dArr = dateStr.split("-"); // ex input: "2010-01-18"
  const year = d.getFullYear();
  return dArr[2] + "/" + dArr[1] + "/" + year.toString(); //ex output: "18/01/10"
};
