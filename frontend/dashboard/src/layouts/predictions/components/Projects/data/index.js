// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// @mui material components
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";

function PredictionsTableOld() {
  const fakePredictions = [
    {
      claim: "Vaccines are effective against COVID-19.",
      prediction: "support",
      model: "Factify",
      date: "2025-04-20 14:22",
      confidence: 0.94,
    },
    {
      claim: "5G towers cause health problems.",
      prediction: "refute",
      model: "Factify",
      date: "2025-04-20 14:23",
      confidence: 0.89,
    },
    {
      claim: "Aliens built the pyramids.",
      prediction: "not enough info",
      model: "Factify",
      date: "2025-04-20 14:24",
      confidence: 0.76,
    },
  ];

  return (
    <Card>
      <VuiBox pt={3} px={3}>
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          Predictions Table
        </VuiTypography>
        <VuiBox mt={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Claim</TableCell>
                  <TableCell>Prediction</TableCell>
                  <TableCell>Confidence</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fakePredictions.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.claim}</TableCell>
                    <TableCell>{row.prediction}</TableCell>
                    <TableCell>
                      <VuiBox>
                        <VuiTypography color="white" variant="button" fontWeight="bold">
                          {Math.round(row.confidence * 100)}%
                        </VuiTypography>
                        <VuiProgress
                          value={row.confidence * 100}
                          color="info"
                          label={false}
                          sx={{ background: "#2D2E5F" }}
                        />
                      </VuiBox>
                    </TableCell>
                    <TableCell>{row.model}</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default PredictionsTableOld;
