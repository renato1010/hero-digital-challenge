import styles from "./App.module.scss";
import { CheckBoxField } from "./CheckBoxField";
import { TextFieldProps, TextField } from "./TextField";

const textFields: TextFieldProps[] = [
  { name: "firstName", labelName: "first name" },
  { name: "lastName", labelName: "last name" },
  { name: "email", labelName: "email address" },
  { name: "organization", labelName: "organization", isRequired: false },
];
const selectField: TextFieldProps = {
  name: "euResident",
  labelName: "eu resident",
  isRequired: true,
  hasError: false,
  errorMessage: undefined,
};
const checkboxFields: TextFieldProps[] = [
  {
    name: "advances",
    labelName: "advanced",
  },
  {
    name: "alerts",
    labelName: "alerts",
    isRequired: false,
  },
  {
    name: "other",
    labelName: "other communications",
    isRequired: false,
  },
];
function App() {
  return (
    <main className={styles.shell}>
      <div className={styles.container}>
        <h2>Sign up for email updates</h2>
        <p>*Indicates Required Field</p>
        <form className={styles.form}>
          <fieldset className={styles.boxes}>
            {textFields.map((field) => (
              <div className={styles.textInput}>
                <TextField {...field} />
              </div>
            ))}
          </fieldset>
          <div className={styles.selectWrapper}>
            {selectField.hasError ? <p className={styles["error-msg"]}>{selectField.errorMessage}</p> : null}
            <label className={styles.label} htmlFor="euResident">
              {selectField.labelName + (selectField.isRequired ? "*" : "")}
            </label>
            <select
              className={
                styles.textField + " " + (selectField.hasError ? styles.errorState : styles.noErrorState)
              }
              name="euResident"
            >
              <option value="">-SELECT ONE - {">"}</option>
              <option value="yes">Yes</option>
              <option value="yes">No</option>
            </select>
          </div>
          <fieldset className={styles.boxes}>
            {checkboxFields.map((cbField) => (
              <div className={styles.textInput}>
                <CheckBoxField {...cbField} />
              </div>
            ))}
          </fieldset>
        </form>
      </div>
    </main>
  );
}

export default App;
