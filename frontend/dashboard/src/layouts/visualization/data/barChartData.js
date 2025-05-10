export const barChartDataModels = [
  {
    name: "Précision",
    data: [0.89, 0.82, 0.94],
  },
  {
    name: "Rappel",
    data: [0.81, 0.78, 0.90],
  },
  {
    name: "F1-Score",
    data: [0.85, 0.80, 0.92],
  },
];

export const barChartOptionsModels = {
  chart: {
    toolbar: { 
      show: false 
    },
  },
  tooltip: {
    theme: "dark",
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '45%',
      distributed: false,
    }
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ["BERT-base", "RoBERTa-large", "FactifyNet"],
    labels: {
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
      formatter: function(val) {
        return val.toFixed(2);
      }
    },
    max: 1.0
  },
  legend: {
    position: "top",
    labels: {
      colors: "#c8cfca",
      useSeriesColors: false
    },
  },
  grid: {
    strokeDashArray: 5,
    borderColor: "#56577A",
  },
  colors: ["#0075FF", "#2CD9FF", "#FF0080"],
  fill: {
    opacity: 1
  },
};