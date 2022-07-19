import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import type { EverageData, Product } from "../../types/interfaces";
import { Header } from "../../components/header";
import { Chart } from "../../components/chart";
import { Menu } from "../../components/menu";
import styles from "./dashboard.module.css";

const DESCRIPTION = `This dashboard consists of a chart that displays the GHG emissions of Germany from the period 2019-02-01 to 2022-06-15. 
You can select the GHG type on the Product select input above.`;

const ERROR_MESSAGE =
  "Sorry but there is an error on the API to request the data. Refresh this page and try again.";

export function Dashboard() {
  const [productSelected, setProductSelected] = useState<string>();
  const [products, setProducts] = useState<Product[]>();
  const [data, setData] = useState<EverageData[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const processProducts = (productsArray: Product[]) => {
    setProducts(productsArray);
    setProductSelected(productsArray[0].name);
  };

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.v2.emissions-api.org/api/v2/products.json`
      );
      processProducts(response.data);
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const processData = (data: EverageData[]) => {
    const formatedData = data.map((element: EverageData) => {
      return { ...element, start: element.start.split("T")[0] };
    });
    setData(formatedData);
  };

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.v2.emissions-api.org/api/v2/${productSelected}/average.json?country=DE&begin=2019-02-01&end=2022-06-15`
      );
      processData(response.data);
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [productSelected]);

  useEffect(() => {
    productSelected && getData();
  }, [getData, productSelected]);

  const handleProductSelect = (product: string) => {
    setProductSelected(product);
  };

  return (
    <div>
      <Header />
      {error ? (
        <p className={styles.status}>{ERROR_MESSAGE}</p>
      ) : (
        <>
          <Menu products={products} onProductSelect={handleProductSelect} />
          <div className={styles.main}>
            <p className={styles.description}>{DESCRIPTION}</p>
            {loading ? (
              <p className={styles.status}>Loading...</p>
            ) : (
              <Chart data={data} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
