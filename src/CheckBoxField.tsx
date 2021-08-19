import { StateKeys } from "./App";
import styles from "./CheckBoxField.module.scss";
import { TextFieldProps } from "./TextField";

const CheckBoxField = ({
  name,
  labelName,
  isRequired = true,
  hasError = false,
  errorMessage,
  isChecked,
  checkboxEventHandler,
}: TextFieldProps & {
  isChecked: boolean;
  checkboxEventHandler: ({ name, isChecked }: { name: StateKeys; isChecked: boolean }) => void;
}) => {
  return (
    <div className={styles.wrapper}>
      {hasError ? <p className={styles["error-msg"]}>{errorMessage}</p> : null}
      <div className={styles.formGroup}>
        <input
          onChange={() => checkboxEventHandler({ name, isChecked })}
          type="checkbox"
          name={name}
          id={name}
          value={name}
          checked={isChecked}
        />
        <label htmlFor={name}>{labelName + (isRequired ? "*" : "")}</label>
      </div>
    </div>
  );
};

export { CheckBoxField };
