import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./menu.module.css";

interface Product {
  description: string;
  name: string;
  product_variable: string;
}

export function Menu() {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://api.v2.emissions-api.org/api/v2/products.json`
        );
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <ul className={styles.menu}>
      <li>
        <label htmlFor="product-select">Product: </label>
        <select name="products" id="product-select">
          {products &&
            products.map((product: Product) => (
              <option key={product.name}>{product.name}</option>
            ))}
        </select>
      </li>
      <li>
        <span>Country: Germany</span>
      </li>
      <li>
        <span>Start date: 2019-02-01 </span>
      </li>
      <li>
        <span>End date: 2022-06-15 </span>
      </li>
    </ul>
  );
}
