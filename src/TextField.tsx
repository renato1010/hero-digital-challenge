import styles from "./TextField.module.scss";

export type TextFieldProps = {
  name: string;
  labelName: string;
  isRequired?: boolean;
  hasError?: boolean;
  errorMessage?: string;
};
const TextField = ({
  name,
  labelName,
  isRequired = true,
  hasError = false,
  errorMessage,
}: TextFieldProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      {hasError ? <p className={styles["error-msg"]}>{errorMessage}</p> : null}
      <label className={styles.label} htmlFor={name}>
        {labelName + (isRequired ? "*" : "")}
      </label>
      <input
        className={styles.textField + " " + (hasError ? styles.errorState : styles.noErrorState)}
        type="text"
        name={name}
      />
    </div>
  );
};

export { TextField };
