import styles from "./CheckBoxField.module.scss";
import { TextFieldProps } from "./TextField";

const CheckBoxField = ({
  name,
  labelName,
  isRequired = true,
  hasError = false,
  errorMessage,
  onInputChange,
}: TextFieldProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.formGroup}>
        <input type="checkbox" name={name} />
        <label htmlFor={name}>{labelName}</label>
      </div>
    </div>
  );
};

export { CheckBoxField };
