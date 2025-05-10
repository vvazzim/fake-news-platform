import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";
import { IoDocumentText, IoRocket, IoGlobe } from "react-icons/io5";

function DatasetStatistics() {
  const [datasetStats, setDatasetStats] = useState({
    totalSamples: 0,
    fakeNews: 0,
    trueNews: 0,
    growth: 0,
  });

  useEffect(() => {
    const fetchDatasetStats = async () => {
      try {
        const response = await axios.get("http://localhost:8004/metrics/dataset-stats");
        const { total_samples, fake_news, true_news, growth_percentage } = response.data;
        setDatasetStats({
          totalSamples: total_samples,
          fakeNews: fake_news,
          trueNews: true_news,
          growth: growth_percentage,
        });
      } catch (error) {
        console.error("❌ Failed to fetch dataset stats:", error);
      }
    };

    fetchDatasetStats();
  }, []);

  return (
    <>
      <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
        Dataset Statistics
      </VuiTypography>
      <VuiBox display="flex" alignItems="center" mb="40px">
        <VuiTypography variant="button" color="success" fontWeight="bold">
          (+{datasetStats.growth}%){" "}
          <VuiTypography variant="button" color="text" fontWeight="regular">
            more data than initial version
          </VuiTypography>
        </VuiTypography>
      </VuiBox>

      <Grid container spacing="30px">
        <Grid item xs={8} md={4} lg={4}>
          <Stack direction="row" spacing={{ sm: "10px", xl: "4px", xxl: "10px" }} mb="6px">
            <VuiBox
              bgColor="info"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
            >
              <IoDocumentText color="#fff" size="12px" />
            </VuiBox>
            <VuiTypography color="text" variant="button" fontWeight="medium">
              Total Samples
            </VuiTypography>
          </Stack>
          <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
            {datasetStats.totalSamples.toLocaleString()}
          </VuiTypography>
          <VuiProgress value={85} color="info" sx={{ background: "#2D2E5F" }} />
        </Grid>

        <Grid item xs={6} md={3} lg={4}>
          <Stack direction="row" spacing={{ sm: "10px", xl: "4px", xxl: "10px" }} mb="6px">
            <VuiBox
              bgColor="info"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
            >
              <IoRocket color="#fff" size="12px" />
            </VuiBox>
            <VuiTypography color="text" variant="button" fontWeight="medium">
              Fake News
            </VuiTypography>
          </Stack>
          <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
            {datasetStats.fakeNews.toLocaleString()}
          </VuiTypography>
          <VuiProgress value={55} color="error" sx={{ background: "#2D2E5F" }} />
        </Grid>

        <Grid item xs={6} md={3} lg={4}>
          <Stack direction="row" spacing={{ sm: "10px", xl: "4px", xxl: "10px" }} mb="6px">
            <VuiBox
              bgColor="info"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
            >
              <IoGlobe color="#fff" size="12px" />
            </VuiBox>
            <VuiTypography color="text" variant="button" fontWeight="medium">
              True News
            </VuiTypography>
          </Stack>
          <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
            {datasetStats.trueNews.toLocaleString()}
          </VuiTypography>
          <VuiProgress value={45} color="success" sx={{ background: "#2D2E5F" }} />
        </Grid>
      </Grid>
    </>
  );
}

export default DatasetStatistics;
