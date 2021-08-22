import { ChangeEvent, FormEvent, useEffect, useReducer, useState } from "react";
import styles from "./App.module.scss";
import { CheckBoxField } from "./CheckBoxField";
import { TextField } from "./TextField";
import { validator, isFormDataValid, textFields, selectField, checkboxFields } from "./utils";

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
type FormActions = { type: StateKeys; payload: string } | { type: "reset" };
function formReducer(state: FormState, action: FormActions): FormState {
  if (action.type === "reset") {
    return initialState;
  }
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
function App() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState<string | null>(null);
  const [serverResponse, setServerResponse] = useState<null | Record<string, any>>(null);
  const postBodyFactory = () => {
    if (!isFormValid) return;
    let formBody: string[] = [];
    Object.entries(state).forEach((item) => {
      const prop = encodeURIComponent(item[0]);
      const val = encodeURIComponent(item[1]["value"]);
      if (val.length) {
        formBody = [...formBody, prop + "=" + val];
      }
    });
    const encodedData = formBody.join("&");
    setFormData(encodedData);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isFormDataValid(state)) {
      setIsFormValid(true);
      postBodyFactory();
    } else {
      setIsFormValid(false);
    }
  });
  const onPostData = async () => {
    // post to server
    const body = formData;
    if (body === null) {
      return;
    }
    const response = await fetch("/form", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = await response.json();
    setServerResponse(data);
  };
  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      await onPostData();
    } catch (error) {
      console.log({ error });
    }
  };
  const onReset = () => {
    dispatch({ type: "reset" });
    setIsFormValid(false);
    setFormData(null);
    setServerResponse(null);
  };
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
  // blocks
  const form = (
    <form className={styles.form} onSubmit={onSubmit}>
      <fieldset className={styles.boxes}>
        {textFields.map((field) => (
          <div key={field.name} className={styles.textInput}>
            <TextField
              {...field}
              hasError={!!state[field.name]["errors"].length}
              errorMessage={state[field.name]["errors"]?.[0]?.message ?? undefined}
              onInputChange={fieldEventHandler}
              value={state[field.name]["value"]}
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
          <button onClick={() => onSubmit} disabled={!isFormValid} className={styles.btnSubmit}>
            SUBMIT
          </button>
        </div>
        <div className={styles.buttonWrapper}>
          <button type="reset" onClick={onReset}>
            RESET
          </button>
        </div>
      </fieldset>
    </form>
  );
  const resBlock = (
    <div className={styles.responseBlock}>
      <pre>{JSON.stringify(serverResponse, undefined, 4)}</pre>
    </div>
  );
  return (
    <main className={styles.shell}>
      <div className={styles.container}>
        <h2>Sign up for email updates</h2>
        <p>*Indicates Required Field</p>
        {serverResponse ? resBlock : form}
      </div>
    </main>
  );
}

export default App;
