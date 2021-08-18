import { ChangeEvent, useEffect, useReducer } from "react";
import styles from "./App.module.scss";
import { CheckBoxField } from "./CheckBoxField";
import { TextFieldProps, TextField } from "./TextField";
import { validator } from "./utils/validation";

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
type StateValue = { value: string | boolean; errors: ValidatorError[] };
const initialState: Record<StateKeys, StateValue> = {
  firstName: { value: "", errors: [] },
  lastName: { value: "", errors: [] },
  email: { value: "", errors: [] },
  organization: { value: "", errors: [] },
  euResident: { value: "", errors: [] },
  advances: { value: false, errors: [] },
  alerts: { value: false, errors: [] },
  other: { value: false, errors: [] },
};
type FormState = typeof initialState;
type FormActions = { type: StateKeys; payload: string | boolean };
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
        errors: [...state[action.type]["errors"], validated],
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
  useEffect(() => {
    console.log({ state });
  });
  const fieldEventHandler = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = evt.target;
    console.log({ name, value });
    dispatch({ type: name as StateKeys, payload: value });
  };
  // const onSelectHandler = (evt: ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = evt.target;
  //   dispatch({ type: name as StateKeys, payload: value });
  // };
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
                  hasError={!!state[field.name as StateKeys]["errors"].length}
                  errorMessage={state[field.name as StateKeys]["errors"]?.[0]?.message ?? undefined}
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
                <CheckBoxField {...cbField} onInputChange={fieldEventHandler} />
              </div>
            ))}
          </fieldset>
          <fieldset className={styles.boxes}>
            <div className={styles.buttonWrapper}>
              <button className={styles.btnSubmit}>SUBMIT</button>
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
