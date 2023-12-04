import styles from "./box.module.css";

const BoxLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default BoxLayout;
