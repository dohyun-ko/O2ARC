export const numToColor = (num: number): string => {
  switch (num) {
    case 0:
      return "#000000";
    case 1:
      return "#0074D9";
    case 2:
      return "#FF4136";
    case 3:
      return "#2ECC40";
    case 4:
      return "#FFDC00";
    case 5:
      return "#AAAAAA";
    case 6:
      return "#F012BE";
    case 7:
      return "#FF851B";
    case 8:
      return "#7FDBFF";
    case 9:
      return "#870C25";
    default:
      return "#000000";
  }
};
