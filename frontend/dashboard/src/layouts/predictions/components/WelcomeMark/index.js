import React, { useState } from "react";

import { Card } from "@mui/material";
import VuiAlert from "components/VuiAlert";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiInput from "components/VuiInput";
import axios from "axios";

import gif from "assets/images/cardimgfree.png";

const WelcomeMark = () => {
  const [inputText, setInputText] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleTest = async () => {
    try {
      console.log("✅ Texte envoyé :", inputText);

      const response = await axios.post("http://localhost:8004/predict", {
        text: inputText,
      });

      const predictions = response.data.predictions;
      console.log("✅ Résultats :", predictions);

      let message = "";
      Object.entries(predictions).forEach(([model, prediction]) => {
        message += `${model}: ${prediction.prediction} (${(prediction.confidence * 100).toFixed(2)}%)\n`;
      });

      setAlertMessage(message);
      setAlertOpen(true);

    } catch (error) {
      console.error("❌ Erreur lors de l'envoi :", error);
      setAlertMessage("Erreur lors de la prédiction. Veuillez réessayer.");
      setAlertOpen(true);
    }
  };

  return (
    <Card
      sx={() => ({
        height: "auto",
        py: "32px",
        backgroundImage: `url(${gif})`,
        backgroundSize: "cover",
        backgroundPosition: "50%",
      })}
    >
      <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between" padding="24px">
        
        {/* Titre */}
        <VuiBox mb={3}>
          <VuiTypography color="white" variant="h1" fontWeight="bold">
            Try it yourself
          </VuiTypography>
        </VuiBox>

        {/* Alerte si besoin */}
        {alertOpen && (
          <VuiAlert color="info" onClose={() => setAlertOpen(false)}>
            <pre style={{ margin: 0, whiteSpace: "pre-wrap", color: "white" }}>
              {alertMessage}
            </pre>
          </VuiAlert>
        )}

        {/* Input texte */}
        <VuiBox mb={3}>
          <VuiInput
            variant="outlined"
            placeholder="Type your claim here..."
            fullWidth
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            sx={{
              input: { fontSize: "18px",color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
          />
        </VuiBox>

        {/* Bouton */}
        <VuiBox display="flex" justifyContent="flex-end">
          <VuiButton
            variant="contained"
            color="primary"
            onClick={handleTest}
            sx={{
              backgroundColor: "#1A73E8",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              px: 5,
              py: 2,
              textTransform: "none",
              "&:hover": { backgroundColor: "#1669C1" },
            }}
          >
            Test the Claim
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </Card>
  );
};

export default WelcomeMark;
