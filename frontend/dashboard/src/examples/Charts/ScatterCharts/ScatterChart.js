import Chart from "react-apexcharts";
import PropTypes from "prop-types";
import VuiBox from "components/VuiBox";

function ScatterChart({ scatterChartData, scatterChartOptions }) {
  return (
    <VuiBox>
      <Chart
        options={scatterChartOptions}
        series={scatterChartData}
        type="scatter"
        height={310}
      />
    </VuiBox>
  );
}

ScatterChart.propTypes = {
  scatterChartData: PropTypes.array.isRequired,
  scatterChartOptions: PropTypes.object.isRequired,
};

export default ScatterChart;
