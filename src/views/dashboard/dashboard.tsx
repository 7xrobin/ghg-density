import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../../types/interfaces";
import { Chart } from "../../components/chart";
import { Menu } from "../../components/menu";

const DESCRIPTION = `Plan A helps companies monitor, reduce, and offset their carbon footprint,
  based on the data they input about their emissions. Though this gives individual companies visibility
  on their own emissions, it doesn’t give us a clear idea on our progress on a country level. This task
  addresses the other side of the problem; using satellite data to estimate the amount of GHG emissions
  in the atmosphere over time to measure our actual impact.`;

export function Dashboard() {
  const [productSelected, setProductSelected] = useState<string>();
  const [products, setProducts] = useState<Product[]>();

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `https://api.v2.emissions-api.org/api/v2/products.json`
      );
      const productsArray: Product[] = response.data;
      setProducts(productsArray);
      setProductSelected(productsArray[0].name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleProductSelect = (product: string) => {
    setProductSelected(product);
  };

  return (
    <div>
      <h1>There is no Plan B</h1>
      <Menu products={products} onProductSelect={handleProductSelect} />
      <Chart product={productSelected} />
    </div>
  );
}
