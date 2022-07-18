import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./menu.module.css";

interface Product {
  description: string;
  name: string;
  product_variable: string;
}

interface MenuProps {
  onProductSelect: Function;
}

export function Menu({ onProductSelect }: MenuProps) {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://api.v2.emissions-api.org/api/v2/products.json`
        );
        const productsArray: Product[] = response.data;
        setProducts(productsArray);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    products && onProductSelect(products[0].name);
  }, [products]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onProductSelect(e.target.value);
  };

  return (
    <ul className={styles.menu}>
      <li>
        <label htmlFor="product-select">Product: </label>
        <select name="products" id="product-select" onChange={handleSelect}>
          {products &&
            products.map((product: Product) => (
              <option key={product.name} value={product.name}>
                {product.name}
              </option>
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
