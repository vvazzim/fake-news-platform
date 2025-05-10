export const pcaChartOptions = {
  chart: {
    type: "scatter",
    zoom: { 
      enabled: true 
    },
    toolbar: { 
      show: false 
    },
    dropShadow: {
      enabled: true,
      top: 5,
      left: 0,
      blur: 3,
      opacity: 0.1
    }
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 0
  },
  xaxis: {
    title: { 
      text: "PC1",
      style: {
        color: "#c8cfca",
        fontSize: "12px"
      }
    },
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
    title: { 
      text: "PC2",
      style: {
        color: "#c8cfca",
        fontSize: "12px"
      }
    },
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "10px",
      },
    },
  },
  legend: {
    position: "top",
    labels: {
      colors: "#c8cfca",
      useSeriesColors: false
    },
    markers: {
      width: 12,
      height: 12,
      strokeWidth: 0,
      radius: 12,
    }
  },
  grid: {
    strokeDashArray: 5,
    borderColor: "#56577A",
  },
  colors: ["#0075FF", "#2CD9FF", "#FF0080", "#FFC700", "#00D1FF", "#00FFC2"],
  markers: {
    size: 6,
    strokeWidth: 0,
    hover: {
      size: 8
    }
  }
};

export const pcaChartData = [
  {
    name: "Classe 1",
    data: [
      { x: 1.2, y: 2.1 },
      { x: 2.3, y: 1.8 },
      { x: 1.9, y: 2.5 },
    ],
  },
  {
    name: "Classe 2",
    data: [
      { x: 3.1, y: 3.3 },
      { x: 2.8, y: 3.5 },
      { x: 3.2, y: 2.9 },
    ],
  },
];