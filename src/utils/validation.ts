import { StateKeys, ValidatorError } from "../App";

type ValidatorFunction = (value: string | boolean) => ValidatorError;
type ValidatorObj = Record<StateKeys, ValidatorFunction>;
const firstNameValidator: ValidatorFunction = (val: string | boolean) => {
  if (typeof val === "boolean") {
    return { field: "firstName", message: "First name is a string value" };
  }
  if (val.length < 1) {
    return { field: "firstName", message: "First Name is required" };
  }
  return null;
};
const lastNameValidator: ValidatorFunction = (val: string | boolean) => {
  if (typeof val === "boolean") {
    return { field: "lastName", message: "Last name is a string value" };
  }
  if (val.length < 1) {
    return { field: "lastName", message: "Last Name is required" };
  }
  return null;
};
const emailValidator: ValidatorFunction = (val: string | boolean) => {
  if (typeof val === "boolean") {
    return { field: "email", message: "Email is a string value" };
  }
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isEmailOk = re.test(val.toLowerCase());

  if (!isEmailOk) {
    return { field: "email", message: "Email address is not ok" };
  }
  return null;
};
const organizationValidator: ValidatorFunction = (val: string | boolean) => {
  if (typeof val === "boolean") {
    return { field: "organization", message: "Organization is a string value" };
  }
  return null;
};
const euResidentValidator: ValidatorFunction = (val: string | boolean) => {
  if (typeof val === "boolean") {
    return { field: "euResident", message: "euResident is a string value" };
  }
  if (val.length === 0) {
    return { field: "euResident", message: "EU Resident is required" };
  }
  return null;
};
const advancesValidator: ValidatorFunction = (val: string | boolean) => {
  if (typeof val === "string") {
    return { field: "advances", message: "Advances is a true/false value" };
  }
  if (val === false) {
    return { field: "advances", message: "Advances is required" };
  }
  return null;
};
const nonReqCheckboxValidator: ValidatorFunction = (val: string | boolean) => {
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
