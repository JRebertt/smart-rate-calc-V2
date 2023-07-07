import { FormValues, Product } from "../@types/types";
import { calculateInstallment } from "../components/NewOrderForm";

export const createOrder = (formValues: FormValues, products: Product[]) => {
  // Obter todas as informações do formulário
  const { name, multiOptions, singleOption, otherOption, paymentOption } =
    formValues;

  // Obter os produtos selecionados
  const selectedProducts = products.filter((product) =>
    multiOptions.includes(product.value)
  );

  // Calcular o preço total dos produtos selecionados
  const totalPrice = selectedProducts.reduce(
    (acc, product) => acc + product.cashPrice,
    0
  );

  // Calcular o valor do parcelamento
  const numberOfInstallments = parseInt(singleOption || "1");
  const installmentValue = calculateInstallment(
    totalPrice,
    numberOfInstallments
  );

  // Criar o objeto de pedido com todas as informações necessárias
  const order = {
    customerName: name,
    products: selectedProducts,
    totalPrice,
    paymentOption,
    cardBrand: otherOption,
    numberOfInstallments,
    installmentValue,
  };

  return order;
};