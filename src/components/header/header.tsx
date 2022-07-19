import { ReactComponent as PlanALogo } from "../../assets/plana_logo.svg";
import styles from "./header.module.css";

export function Header() {
  return (
    <div className={styles.container}>
      <PlanALogo className={styles.logo} />
      <h1>There is no Plan B</h1>
    </div>
  );
}
