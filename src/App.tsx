import { ChangeEvent, useEffect, useReducer, useState } from "react";
import styles from "./App.module.scss";
import { CheckBoxField } from "./CheckBoxField";
import { TextFieldProps, TextField } from "./TextField";
import { validator, isFormDataValid } from "./utils/validation";

export type StateKeys =
  | "firstName"
  | "lastName"
  | "email"
  | "organization"
  | "euResident"
  | "advances"
  | "alerts"
  | "other";
export type ValidatorError = { field: StateKeys; message: string } | null;
export type StateValue = { value: string; errors: ValidatorError[] };
const initialState: Record<StateKeys, StateValue> = {
  firstName: { value: "", errors: [] },
  lastName: { value: "", errors: [] },
  email: { value: "", errors: [] },
  organization: { value: "", errors: [] },
  euResident: { value: "", errors: [] },
  advances: { value: "", errors: [] },
  alerts: { value: "", errors: [] },
  other: { value: "", errors: [] },
};
type FormState = typeof initialState;
type FormActions = { type: StateKeys; payload: string };
function formReducer(state: FormState, action: FormActions): FormState {
  const validated = validator[action.type](action.payload);
  if (validated === null) {
    return { ...state, [action.type]: { ...state[action.type], value: action.payload, errors: [] } };
  } else {
    return {
      ...state,
      [action.type]: {
        ...state[action.type],
        value: action.payload,
        errors: [validated],
      },
    };
  }
}
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
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isFormDataValid(state)) {
      setIsFormValid(true);
    }
  });
  const fieldEventHandler = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = evt.target;
    dispatch({ type: name as StateKeys, payload: value });
  };
  const checkBoxEventHandler = (evt: { name: StateKeys; isChecked: boolean }) => {
    const { name, isChecked } = evt;
    if (!isChecked) {
      dispatch({ type: name, payload: name });
    } else {
      dispatch({ type: name, payload: "" });
    }
  };
  return (
    <main className={styles.shell}>
      <div className={styles.container}>
        <h2>Sign up for email updates</h2>
        <p>*Indicates Required Field</p>
        <form className={styles.form}>
          <fieldset className={styles.boxes}>
            {textFields.map((field) => (
              <div key={field.name} className={styles.textInput}>
                <TextField
                  {...field}
                  hasError={!!state[field.name]["errors"].length}
                  errorMessage={state[field.name]["errors"]?.[0]?.message ?? undefined}
                  onInputChange={fieldEventHandler}
                />
              </div>
            ))}
          </fieldset>
          <div className={styles.selectWrapper}>
            {!!state["euResident"]["errors"].length ? (
              <p className={styles["error-msg"]}>{state["euResident"]["errors"]?.[0]?.message}</p>
            ) : null}
            <label className={styles.label} htmlFor="euResident">
              {selectField.labelName + (selectField.isRequired ? "*" : "")}
            </label>
            <select
              style={!!state["euResident"]["errors"].length ? { border: "2px solid #d40462" } : undefined}
              className={
                styles.textField + " " + (selectField.hasError ? styles.errorState : styles.noErrorState)
              }
              name="euResident"
              onChange={fieldEventHandler}
              value={state["euResident"]["value"] as string}
            >
              <option value="">-SELECT ONE - {">"}</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <fieldset className={styles.boxes}>
            {checkboxFields.map((cbField) => (
              <div key={cbField.name} className={styles.textInput}>
                <CheckBoxField
                  {...cbField}
                  checkboxEventHandler={checkBoxEventHandler}
                  hasError={!!state[cbField.name]["errors"].length}
                  errorMessage={state[cbField.name]["errors"]?.[0]?.message ?? undefined}
                  isChecked={!!state[cbField.name]["value"]}
                />
              </div>
            ))}
          </fieldset>
          <fieldset className={styles.boxes}>
            <div className={styles.buttonWrapper}>
              <button disabled={!isFormValid || !state["advances"]["value"]} className={styles.btnSubmit}>
                SUBMIT
              </button>
            </div>
            <div className={styles.buttonWrapper}>
              <button>RESET</button>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  );
}

export default App;
