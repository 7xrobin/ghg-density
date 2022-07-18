import { useState } from "react";
import { Menu } from "./components/menu";
import { Chart } from "./components/chart";
import "./styles/global.module.css";
import "./styles/colors.module.css";

const DESCRIPTION = `Plan A helps companies monitor, reduce, and offset their carbon footprint,
  based on the data they input about their emissions. Though this gives individual companies visibility
  on their own emissions, it doesn’t give us a clear idea on our progress on a country level. This task
  addresses the other side of the problem; using satellite data to estimate the amount of GHG emissions
  in the atmosphere over time to measure our actual impact.`;

const App = (): JSX.Element => {
  const [productSelected, setProductSelected] = useState<string>();

  const handleProductSelect = (product: string) => {
    setProductSelected(product);
  };

  return (
    <div>
      <h1>There is no Plan B</h1>
      <Menu onProductSelect={handleProductSelect} />
      <Chart product={productSelected} />
    </div>
  );
};

export default App;
