import { FormValues } from "../@types/types";

export const resetForm = (setFormValues: React.Dispatch<React.SetStateAction<FormValues>>) => {
  setFormValues({
    name: "",
    multiOptions: [],
    singleOption: null,
    otherOption: null,
    paymentOption: "avista",
  });
};
