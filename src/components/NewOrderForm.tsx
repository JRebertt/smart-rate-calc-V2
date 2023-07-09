import React, { useState } from "react";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { TextField } from "./TextField";
import { SelectField } from "./SelectField";
import {
  data,
  flagOptions,
  installmentOptions,
  paymentOptions,
} from "../data/options";
import { FormValues, OptionType } from "../@types/types";
import { createOrder } from "../functions/createOrder";
import { resetForm } from "../functions/resetForm";

import { useData } from "../context/ProductsProvider";
import { calculateInstallment } from "../functions/calculateInstallment";

export function NewOrderForm() {
  const { products, loading } = useData();
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    multiOptions: [],
    singleOption: "",
    otherOption: "",
    paymentOption: "",
  });

  const handleChange = (name: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const order = createOrder(formValues, products);
      console.log("pedido aqui!!", order);
      resetForm(setFormValues);
      toast.success("Pedido enviado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao enviar o pedido.");
    }
  };

  const productPrice = formValues.multiOptions.reduce((acc, optionValue) => {
    const product = products.find((product) => product.value === optionValue);
    return acc + (product ? product.cashPrice : 0);
  }, 0);

  const calculatedInstallmentOptions = installmentOptions.map(
    (option: OptionType) => {
      const installmentValue = calculateInstallment(
        productPrice,
        parseInt(option.value),
        data
      );
      const label = `${option.label} de ${installmentValue.toLocaleString(
        "pt-BR",
        {
          style: "currency",
          currency: "BRL",
        }
      )}`;

      return { ...option, label };
    }
  );

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <TextField
          label="Nome do Cliente"
          name="name"
          value={formValues.name}
          onChange={(value) => handleChange("name", value)}
        />

        <div className="flex items-center">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Produto:
          </label>
          {loading ? (
            <CircularProgress size={20} className="mb-2 ml-2" />
          ) : (
            <CheckCircleIcon color="success" className="mb-2 ml-2" />
          )}
        </div>

        <SelectField
          isMulti
          options={products}
          value={products.filter((option) =>
            formValues.multiOptions.includes(option.value)
          )}
          onChange={(selectedItems: readonly { value: string }[] | null) =>
            handleChange(
              "multiOptions",
              selectedItems ? selectedItems.map((item) => item.value) : []
            )
          }
        />

        <SelectField
          label="Forma de pagamento:"
          options={paymentOptions}
          value={paymentOptions.find(
            (option) => option.value === formValues.paymentOption
          )}
          onChange={(selectedItem: OptionType | null) =>
            handleChange(
              "paymentOption",
              selectedItem ? selectedItem.value : null
            )
          }
        />

        {formValues.paymentOption === "parcelado" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <SelectField
              label="Bandeira:"
              options={flagOptions}
              value={flagOptions.find(
                (option) => option.value === formValues.otherOption
              )}
              onChange={(selectedItem: OptionType | null) =>
                handleChange(
                  "otherOption",
                  selectedItem ? selectedItem.value : null
                )
              }
            />

            <SelectField
              label="Parcelamento:"
              options={calculatedInstallmentOptions}
              value={calculatedInstallmentOptions.find(
                (option) => option.value === formValues.singleOption
              )}
              onChange={(selectedItem: OptionType | null) =>
                handleChange(
                  "singleOption",
                  selectedItem ? selectedItem.value : null
                )
              }
            />
          </motion.div>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-custom-green text-white rounded-md hover:bg-custom-green"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}

export default NewOrderForm;
