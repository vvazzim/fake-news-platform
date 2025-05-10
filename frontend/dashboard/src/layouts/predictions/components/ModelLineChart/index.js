import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import LineChart from "examples/Charts/LineCharts/LineChart";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";

function ModelLineChart() {
  const [lineChartData, setLineChartData] = useState([]);
  const [lineChartOptions, setLineChartOptions] = useState(lineChartOptionsDashboard);

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const response = await axios.get("http://localhost:8004/metrics/avg-confidence/hourly");
        const hourlyData = response.data.hourly_avg_confidence;
  
        const models = ["Factify", "BERT", "RoBERTa"];
        const hours = Object.keys(hourlyData);
  
        const series = models.map((model) => {
          const modelData = hours.map((hour) => {
            const val = hourlyData[hour][model];
            return typeof val === "number" ? val : 0;
          });
          return { name: model, data: modelData };
        });
  
        setLineChartData(series);
        setLineChartOptions({
          ...lineChartOptionsDashboard,
          xaxis: {
            ...lineChartOptionsDashboard.xaxis,
            categories: hours,
          },
        });
      } catch (error) {
        console.error("❌ Failed to fetch model data:", error);
      }
    };
  
    fetchModelData();
  }, []);
  
  return (
    <Card>
      <VuiBox sx={{ height: "100%" }}>
        <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
          Average Confidence by Hour
        </VuiTypography>
        <VuiBox display="flex" alignItems="center" mb="40px">
          <VuiTypography variant="button" color="success" fontWeight="bold">
            Real-time analysis{" "}
            <VuiTypography variant="button" color="text" fontWeight="regular">
              (hourly updates)
            </VuiTypography>
          </VuiTypography>
        </VuiBox>
        <VuiBox sx={{ height: "310px" }}>
          <LineChart
            lineChartData={lineChartData}
            lineChartOptions={lineChartOptions}
          />
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default ModelLineChart;
