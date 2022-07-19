import { Product } from "../../types/interfaces";
import styles from "./menu.module.css";

interface MenuProps {
  products?: Product[];
  onProductSelect: Function;
}

export function Menu({ products, onProductSelect }: MenuProps) {
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
