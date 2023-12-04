import styles from './button.module.css'

const Button = ({ ...props }) => {
  return (
    <span className={styles.btn} id={props.id} disabled={props.disabled} onClick={() => props.onClickHandler()}>
      {props.text}
    </span>
  );
};

export default Button;
