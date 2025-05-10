import { useEffect, useState } from "react";
import axios from "axios";

// MUI + Vision UI
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsCheckCircleFill } from "react-icons/bs";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";
import Table from "examples/Tables/Table";

function PredictionsTable() {
  const [menu, setMenu] = useState(null);
  const [rows, setRows] = useState([]);

  const columns = [
    { name: "claim", align: "left" },
    { name: "prediction", align: "left" },
    { name: "confidence", align: "center" },
    { name: "model", align: "center" },
    { name: "date", align: "center" },
  ];

  const fetchPredictions = async () => {
    try {
      const response = await axios.get("http://localhost:8004/predictions/latest", {
        headers: { "Content-Type": "application/json" },
      });
      const predictions = response.data.latest_predictions || [];

      const formattedRows = predictions.map((item) => ({
        claim: (
          <VuiTypography color="white" variant="button" fontWeight="medium">
            {item.text}
          </VuiTypography>
        ),
        prediction: (
          <VuiTypography color="white" variant="button" fontWeight="medium">
            {item.prediction}
          </VuiTypography>
        ),
        confidence: (
          <VuiBox>
            <VuiTypography color="white" variant="button" fontWeight="bold">
              {Math.round(item.confidence * 100)}%
            </VuiTypography>
            <VuiProgress
              value={item.confidence * 100}
              color="info"
              label={false}
              sx={{ background: "#2D2E5F" }}
            />
          </VuiBox>
        ),
        model: (
          <VuiTypography color="white" variant="button" fontWeight="medium">
            {item.model}
          </VuiTypography>
        ),
        date: (
          <VuiTypography color="white" variant="button" fontWeight="medium">
            {new Date(item.date).toLocaleString()}
          </VuiTypography>
        ),
      }));

      setRows(formattedRows);
    } catch (error) {
      console.error("Failed to fetch predictions:", error);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={fetchPredictions}>Reload</MenuItem>
    </Menu>
  );

  return (
    <Card sx={{ height: "100% !important", width: "100%" }}>
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <VuiBox mb="auto">
          <VuiTypography color="white" variant="lg" mb="6px" gutterBottom>
            Predictions Log
          </VuiTypography>
          <VuiBox display="flex" alignItems="center" lineHeight={0}>
            <BsCheckCircleFill color="green" size="15px" />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml="5px">
              &nbsp;10 latest predictions
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        <VuiBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </VuiBox>
        {renderMenu}
      </VuiBox>

      <VuiBox
        sx={{
          width: "100%", // prend toute la largeur
        }}
      >
        <Table columns={columns} rows={rows} sx={{ width: "100%" }} />
      </VuiBox>
    </Card>
  );
}

export default PredictionsTable;
