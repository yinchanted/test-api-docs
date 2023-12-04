import Link from "@docusaurus/Link";
import styles from "./box.module.css";

const Box = ({ to, children }) => {
  return (
    <Link className={styles.box} to={to && to}>
      {children}
    </Link>
  );
};

export default Box;
