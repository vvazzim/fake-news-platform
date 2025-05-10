import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import BarChart from "examples/Charts/BarCharts/BarChart";
import axios from "axios";
import { barChartOptionsModels } from "layouts/visualization/data/barChartData"; // le style

function ModelBarChart() {
  const [barChartData, setBarChartData] = useState([]);
  const [barChartOptions, setBarChartOptions] = useState(barChartOptionsModels);

  useEffect(() => {
    const fetchModelPerformance = async () => {
      try {
        const response = await axios.get("http://localhost:8004/metrics/model-performance");
        const { models, precision, recall, f1_score } = response.data;

        const formattedData = [
          {
            name: "Précision",
            data: precision,
          },
          {
            name: "Rappel",
            data: recall,
          },
          {
            name: "F1-Score",
            data: f1_score,
          },
        ];

        setBarChartData(formattedData);

        setBarChartOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: models,
          },
        }));

      } catch (error) {
        console.error("❌ Failed to fetch model performance:", error);
      }
    };

    fetchModelPerformance();
  }, []);

  return (
    <Card>
        <VuiBox sx={{ height: "100%" }}>
        {barChartData.length > 0 && (
        <BarChart
            barChartData={barChartData}
            barChartOptions={barChartOptions}
        />
        )}
        </VuiBox>
    </Card>
  );
}

export default ModelBarChart;
