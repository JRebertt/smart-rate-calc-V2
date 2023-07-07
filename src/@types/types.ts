export type OptionType = { value: string; label: string };

export type FormValues = {
  name: string;
  multiOptions: string[];
  singleOption: string | null;
  otherOption: string | null;
  paymentOption: string | null;
};

export type Product = {
  value: string;
  label: string;
  cashPrice: number;
};