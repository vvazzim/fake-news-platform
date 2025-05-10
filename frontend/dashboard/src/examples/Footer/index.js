import React from "react";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <VuiBox py={3}>
      <VuiTypography
        variant="button"
        fontWeight="regular"
        color="text"
        textAlign="center"
        width="100%"
      >
        © {currentYear}, Fake News Detection Platform — made with ❤️ by{" vvazzim"}
      </VuiTypography>
    </VuiBox>
  );
}

export default Footer;
