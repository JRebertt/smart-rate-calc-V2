import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";
import { Product } from "../@types/types";
import { createOrder } from "../functions/createOrder";

// interface DownloadPDFButtonProps {
//   order: {
//     customerName: string;
//     products: Product[];
//     totalPrice: number;
//     paymentOption: string | null;
//     cardBrand: string | null;
//     numberOfInstallments: number;
//     installmentValue: number;
//   } | null;
// }

export function DownloadPDFButton() {
  // console.log(createOrder);

  const handleButtonClick = () => {
    // const tableBody = order.products.map(
    //   (product: Product, index: number) => [
    //     { txt: (index + 1).toString() },
    //     { txt: product.label },
    //     { txt: "1" },
    //     { txt: product.cashPrice },
    //   ]
    // );

    // const invTotal = totalPrice.toString();

    const props = {
      outputType: OutputType.Save,
      fileName: `Orçamento.pdf`,
      business: {
        name: "Norte Gases",
        address: "Av. Maximino Porpino da Silva",
        phone: "(91) 3721-1772",
        email: "financeiro@nortegases.com",
        website: "www.nortegases.com",
      },
      contact: {
        label: "Orçamento para:",
        // name: ,
      },
      invoice: {
        label: "Orçamento #: ",
        num: 1,
        invDate: `Data de Emissão: ${new Date().toLocaleDateString()}`, // Usando a data atual
        invGenDate: "Data de Vencimento: 01/02/2022",
        headerBorder: false,
        tableBodyBorder: false,
        header: [
          { title: "#", style: { width: 10 } },
          { title: "Descrição", style: { width: 60 } },
          { title: "Quantidade", style: { width: 15 } },
          { title: "Preço", style: { width: 15 } },
        ],
        tableBodyStyle: {
          fontSize: 10,
        },
        // table: tableBody,
        invTotalLabel: "Total:",
        // invTotal,
        invCurrency: "BRL",
        row1: {
          col1: "Obrigado pela preferência!",
          col2: "",
          col3: "",
          col4: "",
          style: {
            fontSize: 14,
          },
        },
      },
    };

    jsPDFInvoiceTemplate(props);
  };
  return <button onClick={handleButtonClick}>Download PDF</button>;
}
