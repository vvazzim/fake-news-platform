export const lineChartOptionsPredictions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth", // Lissage
    width: 3, // Bonne épaisseur
  },
  xaxis: {
    type: "category",
    categories: [],
    labels: {
      show: true,
      style: {
        colors: "#c8cfca",
        fontSize: "10px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "10px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
    borderColor: "#56577A",
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined,
      inverseColors: true,
      opacityFrom: 0.7,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#0075FF", "#2CD9FF", "#FFFFFF"], // Pour Factify, BERT, RoBERTa
  },
  colors: ["#0075FF", "#2CD9FF", "#FFFFFF"],
};
