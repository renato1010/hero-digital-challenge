import { TextFieldProps } from "../TextField";

export const textFields: TextFieldProps[] = [
  { name: "firstName", labelName: "first name" },
  { name: "lastName", labelName: "last name" },
  { name: "email", labelName: "email address" },
  { name: "organization", labelName: "organization", isRequired: false },
];
export const selectField: TextFieldProps = {
  name: "euResident",
  labelName: "eu resident",
  isRequired: true,
  hasError: false,
  errorMessage: undefined,
};
export const checkboxFields: TextFieldProps[] = [
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
