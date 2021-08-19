import { StateKeys, ValidatorError, StateValue } from "../App";

type ValidatorFunction = (value: string) => ValidatorError;
type ValidatorObj = Record<StateKeys, ValidatorFunction>;
const firstNameValidator: ValidatorFunction = (val: string) => {
  if (val.length < 1) {
    return { field: "firstName", message: "First Name is required" };
  }
  return null;
};
const lastNameValidator: ValidatorFunction = (val: string) => {
  if (val.length < 1) {
    return { field: "lastName", message: "Last Name is required" };
  }
  return null;
};
const emailValidator: ValidatorFunction = (val: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isEmailOk = re.test(val.toLowerCase());

  if (!isEmailOk) {
    return { field: "email", message: "Email address is not ok" };
  }
  return null;
};
const organizationValidator: ValidatorFunction = (val: string) => {
  return null;
};
const euResidentValidator: ValidatorFunction = (val: string) => {
  if (val.length === 0) {
    return { field: "euResident", message: "EU Resident is required" };
  }
  return null;
};
const advancesValidator: ValidatorFunction = (val: string) => {
  if (val !== "advances") {
    return { field: "advances", message: "Advances is required" };
  }
  return null;
};
const nonReqCheckboxValidator: ValidatorFunction = (val: string) => {
  return null;
};

export const validator: ValidatorObj = {
  firstName: firstNameValidator,
  lastName: lastNameValidator,
  email: emailValidator,
  organization: organizationValidator,
  euResident: euResidentValidator,
  advances: advancesValidator,
  alerts: nonReqCheckboxValidator,
  other: nonReqCheckboxValidator,
};

export const isFormDataValid = (state: Record<StateKeys, StateValue>): boolean => {
  const required: StateKeys[] = ["firstName", "lastName", "email", "euResident", "advances"];
  const allRequiredOk = required.every((name) => {
    const isValOk = validator[name](state[name]["value"]) === null;
    return isValOk;
  });
  return allRequiredOk;
};
