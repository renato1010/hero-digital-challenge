import styles from "./CheckBoxField.module.scss";
import { TextFieldProps } from "./TextField";

const CheckBoxField = ({
  name,
  labelName,
  isRequired = true,
  hasError = false,
  errorMessage,
}: TextFieldProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.formGroup}>
        <input type="checkbox" id={name} />
        <label htmlFor={name}>{labelName}</label>
      </div>
    </div>
  );
};

export { CheckBoxField };
