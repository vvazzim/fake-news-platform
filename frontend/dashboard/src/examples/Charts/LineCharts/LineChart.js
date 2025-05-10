import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function LineChart({ lineChartData, lineChartOptions }) {
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData(lineChartData);
  }, [lineChartData]);

  useEffect(() => {
    setChartOptions(lineChartOptions);
  }, [lineChartOptions]);

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type="area"
      width="100%"
      height="100%"
    />
  );
}

export default LineChart;
