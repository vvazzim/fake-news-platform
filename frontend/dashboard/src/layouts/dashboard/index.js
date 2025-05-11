
// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import ConfidenceRate from "layouts/dashboard/components/Confidence Rate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { IoAnalytics } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoWarning } from "react-icons/io5";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

// Data
import ModelBarChart from "layouts/visualization/components/ModelBarChart";
import DatasetStatistics from "layouts/visualization/components/DatasetStatistics";
import ModelLineChart from "layouts/visualization/components/ModelLineChart";
import PredictionsTable from "layouts/predictions/components/Projects/index";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";

import { useEffect, useState } from "react";
import axios from "axios";


function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;

  // 🆕 Ajout du state pour stocker les stats
  const [stats, setStats] = useState({
    total_predictions: 0,
    accuracy: 0,
    fake_predicted_percentage: 0,
    active_models: 0,
    accuracy_gain: 0,
  });
  

  // 🆕 Appel API pour récupérer les stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:8004/dashboard/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques :", error);
      }
    };
  
    fetchStats();
  }, []);
  


  return (
    <DashboardLayout>
          <DashboardNavbar />
          <VuiBox py={3}>
            <VuiBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={3}>
                  <MiniStatisticsCard
                    title={{ text: "total predictions", fontWeight: "regular" }}
                    count={stats.total_predictions}
                    percentage={{ color: "info", text: "" }}
                    icon={{ color: "info", component: <IoAnalytics  size="22px" color="white" /> }}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <MiniStatisticsCard
                    title={{ text: "accuracy" }}
                    count={`${(stats.accuracy * 100).toFixed(1)}%`}
                    percentage={{ color: "success", text: `+${(stats.accuracy_gain * 100).toFixed(1)}%` }}
                    icon={{ color: "info", component: <IoCheckmarkCircle  size="22px" color="white" /> }}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <MiniStatisticsCard
                    title={{ text: "fake predicted" }}
                    count={`${stats.fake_predicted_percentage.toFixed(1)}%`}
                    percentage={{ color: "error", text: "" }}
                    icon={{ color: "info", component: <IoWarning  size="20px" color="white" /> }}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <MiniStatisticsCard
                    title={{ text: "active models" }}
                    count={stats.active_models}
                    percentage={{ color: "info", text: "" }}
                    icon={{ color: "info", component: <IoSettings  size="20px" color="white" /> }}
                  />
                </Grid>
              </Grid>
            </VuiBox>

        <VuiBox mb={2}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={13} xl={5}>
              <ConfidenceRate />
            </Grid>
            <Grid item xs={12} lg={12} xl={5}>
              <ReferralTracking />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
                  <VuiBox sx={{ height: "100%" }}>
              
                  <ModelLineChart
                    lineChartData={lineChartDataDashboard}
                    lineChartOptions={{
                      ...lineChartOptionsDashboard,
                      yaxis: {
                        ...lineChartOptionsDashboard.yaxis,
                        labels: {
                          style: {
                            colors: "#c8cfca",
                            fontSize: "10px",
                          },
                          formatter: function(value) {
                            return value % 1 === 0 ? value : value.toFixed(2); // Formatage pour taux
                          }
                        }
                      }
                    }}
                  />
                </VuiBox>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <Card>
                  <VuiBox
                    mb="24px"
                    height="220px"
                    sx={{
                      background: linearGradient(
                        cardContent.main,
                        cardContent.state,
                        cardContent.deg
                      ),
                      borderRadius: "20px",
                    }}
                  >
                    <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                      Model's Performances (F1-Score)
                    </VuiTypography>
                    <ModelBarChart />
                  </VuiBox>
                  
                  
                  <DatasetStatistics/>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <Grid item xs={12}>
            <PredictionsTable />
          </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
