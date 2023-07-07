// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable'
// import { FormValues, Product } from '../@types/types';
// import { paymentOptions } from '../data/options';

// export const generatePDF = (formValues: FormValues, products: Product[]) => {
//   // Cria um novo documento PDF
//   const doc = new jsPDF();

//   // Adiciona o título "Orçamento" ao PDF
//   doc.setFontSize(18);
//   doc.text('Orçamento', 14, 22);

//   // Adiciona a logo ao PDF
//   const imgData = 'data:image/jpeg;base64,...'; // dados da imagem em base64
//   doc.addImage(imgData, 'JPEG', 150, 14, 40, 20);

//  // Adiciona as informações do cliente ao PDF
// doc.setFontSize(14);
// doc.text(`Nome do Cliente: ${formValues.name}`, 14, 40);
// const paymentOption = paymentOptions.find(
//   (option) => option.value === formValues.paymentOption
// );
// if (paymentOption) {
//   doc.text(`Forma de pagamento: ${paymentOption.label}`, 14, 48);
// } else {
//   doc.text('Forma de pagamento: Não selecionada', 14, 48);
// }


//   // Adiciona uma tabela com os produtos ao PDF
//   doc.autoTable({
//     startY: 60,
//     head: [['Produto', 'Valor']],
//     body: formValues.multiOptions.map((optionValue) => {
//       const product = products.find((product) => product.value === optionValue);
//       return [product.label, product.cashPrice];
//     }),
//   });

//   // Salva o PDF
//   doc.save('orcamento.pdf');
// };
