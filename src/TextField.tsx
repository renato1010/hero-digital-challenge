import { ChangeEvent, CSSProperties } from "react";
import styles from "./TextField.module.scss";

export type TextFieldProps = {
  name: string;
  labelName: string;
  isRequired?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  value?: string;
  onInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};
const TextField = ({
  name,
  labelName,
  isRequired = true,
  hasError,
  errorMessage,
  value,
  onInputChange,
}: TextFieldProps): JSX.Element => {
  const errorStyle: CSSProperties | undefined = hasError ? { border: "2px solid #d40462" } : undefined;
  return (
    <div className={styles.wrapper}>
      {hasError ? <p className={styles["error-msg"]}>{errorMessage}</p> : null}
      <label className={styles.label} htmlFor={name}>
        {labelName + (isRequired ? "*" : "")}
      </label>
      <input
        style={errorStyle}
        className={styles.textField + " " + (hasError ? styles.errorState : styles.noErrorState)}
        type="text"
        name={name}
        onChange={onInputChange}
        value={value}
      />
    </div>
  );
};

export { TextField };
