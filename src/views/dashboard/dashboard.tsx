import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../../types/interfaces";
import { Header } from "../../components/header";
import { Chart } from "../../components/chart";
import { Menu } from "../../components/menu";
import styles from "./dashboard.module.css";

const DESCRIPTION = `This dashboard consists of a chart that displays the GHG emissions of Germany from the period 2019-02-01 to 2022-06-15. 
You can select the GHG type on the select input above.`;

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
      <Header />
      <Menu products={products} onProductSelect={handleProductSelect} />
      <div className={styles.main}>
        <p className={styles.description}>{DESCRIPTION}</p>

        <Chart product={productSelected} />
      </div>
    </div>
  );
}
