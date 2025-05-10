export const lineChartDataPredictions = [
  {
    name: "support",
    data: [30, 40, 35, 50, 49, 60, 70],
  },
  {
    name: "refute",
    data: [20, 30, 25, 40, 45, 55, 60],
  },
  {
    name: "not enough info",
    data: [10, 15, 20, 25, 30, 35, 40],
  },
];

export const lineChartOptionsPredictions = {
  chart: {
    toolbar: { show: false },
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  colors: ["#66BB6A", "#EF5350", "#FFA726"],
};
