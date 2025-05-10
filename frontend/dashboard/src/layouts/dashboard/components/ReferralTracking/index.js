import React, { useEffect, useState } from 'react';
import { Card, Grid, CircularProgress, Stack } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import colors from 'assets/theme/base/colors';
import linearGradient from 'assets/theme/functions/linearGradient';
import { FaEllipsisH } from 'react-icons/fa';
import axios from 'axios';

function ReferralTracking() {
  const { info, gradients } = colors;
  const { cardContent } = gradients;

  const [stats, setStats] = useState({
    total_predictions: 0,
    fake_predictions: 0,
    accuracy: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:8004/dashboard/stats");
        setStats({
          total_predictions: response.data.total_predictions,
          fake_predictions: (response.data.fake_predicted_percentage * response.data.total_predictions) / 100,
          accuracy: response.data.accuracy * 100,
        });
      } catch (error) {
        console.error("Erreur chargement stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <Card
      sx={{
        width: '100%',  // 🆕 Prend toute la largeur
        height: '100%',
        background: linearGradient(gradients.cardDark.main, gradients.cardDark.state, gradients.cardDark.deg),
        p: 3,
        borderRadius: '20px',
      }}
    >
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          Prediction Overview
        </VuiTypography>
        <VuiBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgColor="#22234B"
          sx={{ width: '37px', height: '37px', cursor: 'pointer', borderRadius: '12px' }}
        >
          <FaEllipsisH color={info.main} size="18px" />
        </VuiBox>
      </VuiBox>

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={4}>
          <VuiBox
            p={3}
            sx={{
              background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
              borderRadius: '20px',
            }}
          >
            <VuiTypography color="text" variant="button" fontWeight="regular" mb={1}>
              Total Claims Tested
            </VuiTypography>
            <VuiTypography color="white" variant="h4" fontWeight="bold">
              {stats.total_predictions}
            </VuiTypography>
          </VuiBox>
        </Grid>

        <Grid item xs={12} md={4}>
          <VuiBox
            p={3}
            sx={{
              background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
              borderRadius: '20px',
            }}
          >
            <VuiTypography color="text" variant="button" fontWeight="regular" mb={1}>
              Fakes Detected
            </VuiTypography>
            <VuiTypography color="white" variant="h4" fontWeight="bold">
              {stats.fake_predictions.toFixed(0)}
            </VuiTypography>
          </VuiBox>
        </Grid>

        <Grid item xs={12} md={4}>
          <VuiBox sx={{ position: 'relative', display: 'inline-flex', width: '100%', justifyContent: 'center' }}>
            <CircularProgress
              variant="determinate"
              value={stats.accuracy}
              size={150}
              color="success"
            />
            <VuiBox
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <VuiBox display="flex" flexDirection="column" alignItems="center">
                <VuiTypography color="text" variant="button" mb="4px">
                  Accuracy
                </VuiTypography>
                <VuiTypography color="white" variant="h4" fontWeight="bold">
                  {stats.accuracy.toFixed(1)}%
                </VuiTypography>
              </VuiBox>
            </VuiBox>
          </VuiBox>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ReferralTracking;
