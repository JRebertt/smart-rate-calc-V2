import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { db } from "../lib/Firebase/firebase";

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
import { FormValues, OptionType, Product } from "../@types/types";
import { createOrder } from "../functions/createOrder";
import { useData } from "../context/ProductsProvider";
import { calculateInstallment } from "../functions/calculateInstallment";
import { DownloadPDFButton } from "./DownloadPDFButton";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export function NewOrderForm() {
  const { products, loading } = useData();
  const [order, setOrder] = useState<{
    customerName: string;
    products: Product[];
    totalPrice: number;
    paymentOption: string | null;
    cardBrand: string | null;
    numberOfInstallments: number;
    installmentValue: number;
  } | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      multiOptions: [],
      singleOption: "",
      otherOption: "",
      paymentOption: "",
    },
  });

  const formValues = watch();

  const onSubmit = async (data: FormValues) => {
    try {
      const createdOrder = createOrder(data, products);
      console.log("pedido aqui!!", createdOrder);
      await addDoc(collection(db, "orders"), createdOrder);
      setOrder(createdOrder); // Armazenar o pedido no estado 'order'
      reset();
      toast.success("Pedido salvo com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao salvar o pedido.");
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
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <TextField
          label="Nome do Cliente"
          name="name"
          register={register("name", { required: "Este campo é obrigatório" })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

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
          name="multiOptions"
          options={products}
          value={products.filter((option) =>
            formValues.multiOptions.includes(option.value)
          )}
          register={register("multiOptions", {
            required: "Este campo é obrigatório",
          })}
          error={errors.multiOptions?.message}
          setValue={setValue}
        />

        <SelectField
          label="Forma de pagamento:"
          name="paymentOption"
          options={paymentOptions}
          value={paymentOptions.find(
            (option) => option.value === formValues.paymentOption
          )}
          setValue={setValue}
          register={register("paymentOption", {
            required: "Este campo é obrigatório",
          })}
          error={errors.paymentOption?.message}
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
              name="otherOption"
              options={flagOptions}
              value={flagOptions.find(
                (option) => option.value === formValues.otherOption
              )}
              register={register("otherOption", {
                required: "Este campo é obrigatório",
              })}
              error={errors.otherOption?.message}
              setValue={setValue}
            />

            <SelectField
              label="Parcelamento:"
              name="singleOption"
              options={calculatedInstallmentOptions}
              value={calculatedInstallmentOptions.find(
                (option) => option.value === formValues.singleOption
              )}
              register={register("singleOption", {
                required: "Este campo é obrigatório",
              })}
              error={errors.singleOption?.message}
              setValue={setValue}
            />
          </motion.div>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-custom-green text-white rounded-md hover:bg-custom-green"
        >
          Salvar
        </button>

        <DownloadPDFButton />
      </form>
    </div>
  );
}
