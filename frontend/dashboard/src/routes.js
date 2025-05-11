// Vision UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Predictions from "layouts/predictions";
import Visualization from "layouts/visualization";

// Vision UI Dashboard React icons
import { IoHome } from "react-icons/io5";
import { IoStatsChart } from "react-icons/io5";
import { IoBarChart } from "react-icons/io5";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Predictions",
    key: "predictions",
    route: "/predictions",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Predictions,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Visualizations",
    key: "visualization",
    route: "/visualization",
    icon: <IoBarChart size="15px" color="inherit" />,
    component: Visualization,
    noCollapse: true,
  },
];

export default routes;
