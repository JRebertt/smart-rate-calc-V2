import { FormValues, Product } from "../@types/types";
import { data } from "../data/options";
import { calculateInstallment } from "./calculateInstallment";

export const createOrder = (formValues: FormValues, products: Product[]) => {
  const { name, multiOptions, singleOption, otherOption, paymentOption } = formValues;
  const selectedProducts = products.filter((product) => multiOptions.includes(product.value));
  const totalPrice = selectedProducts.reduce((acc, product) => acc + product.cashPrice, 0);
  const numberOfInstallments = parseInt(singleOption || "1");
  const installmentValue = calculateInstallment(totalPrice, numberOfInstallments, data);

  return {
    customerName: name,
    products: selectedProducts,
    totalPrice,
    paymentOption,
    cardBrand: otherOption,
    numberOfInstallments,
    installmentValue,
  };
};
