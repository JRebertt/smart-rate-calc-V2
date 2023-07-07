// import React from "react";
// import { Document, Page, Text, View } from "@react-pdf/renderer";
// import { createTw } from "react-pdf-tailwind";

// const tw = createTw({
//   theme: {
//     fontFamily: {
//       sans: ["Comic Sans"],
//     },
//     extend: {
//       colors: {
//         custom: "#bada55",
//       },
//     },
//   },
// });

// export function InvoicePDF() {
//   return (
//     <Document>
//       <Page size="A4" style={tw("p-12 font-sans")}>
//         <View style={tw("p-20 bg-gray-100")}>
//           <Text style={tw("text-custom text-3xl")}>Invoice</Text>
//           <View style={tw("bg-green-500 w-24 h-24")}>
//             <Text>Logo</Text>
//           </View>
//         </View>
//         <View style={tw("mt-12 px-8")}>
//           <Text style={tw("text-zinc-700 text-3xl")}>Client Name</Text>
//           <Text style={tw("text-zinc-600 text-lg")}>23/06/2023</Text>
//         </View>

//         <View style={tw("table p-4 bg-white rounded-lg shadow")}>
//           <View>
//             <View style={tw("flex flex-row")}>
//               <Text
//                 style={tw(
//                   "border p-4 font-normal text-gray-900"
//                 )}
//               >
//                 #
//               </Text>
//               <Text
//                 style={tw(
//                   "border p-4 font-normal text-gray-900"
//                 )}
//               >
//                 Nome do Produto
//               </Text>
//               <Text
//                 style={tw(
//                   "border p-4 font-normal text-gray-900"
//                 )}
//               >
//                 Quantidade
//               </Text>
//               <Text
//                 style={tw(
//                   "border p-4 font-normal text-gray-900"
//                 )}
//               >
//                 Valor
//               </Text>
//             </View>
//           </View>
//           <View>
//             {[1, 2, 3, 4].map(() => (
//               <View style={tw("flex flex-row")}>
//                 <Text style={tw("border p-4 text-gray-700")}>1</Text>
//                 <Text style={tw("border p-4 text-gray-700")}>Jean Marc</Text>
//                 <Text style={tw("border p-4 text-gray-700")}>Louis</Text>
//                 <Text style={tw("border p-4 text-gray-700")}>Jl987</Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         <View style={tw("flex flex-row justify-between px-6")}>
//           <View
//             style={tw(
//               "w-80 h-64 p-4 flex flex-col items-center justify-center"
//             )}
//           >
//             <Text style={tw("font-bold text-xl")}>Formas de Pagamento</Text>
//             <Text style={tw("font-normal text-base")}>
//               Pagamento A vista/Parcelado
//             </Text>
//           </View>
//           <View style={tw("w-80 h-64 flex flex-col items-center py-4 gap-4")}>
//             <View style={tw("flex flex-row justify-around gap-6")}>
//               <Text style={tw("font-bold text-xl uppercase")}>sub total:</Text>
//               <Text style={tw("font-semibold text-lg")}>R$ 220,00</Text>
//             </View>
//             <View style={tw("flex flex-row justify-around gap-6")}>
//               <Text style={tw("font-bold text-xl uppercase")}>Taxa:</Text>
//               <Text style={tw("font-semibold text-lg")}>2.00%</Text>
//             </View>
//             <View
//               style={tw(
//                 "flex flex-row justify-around rounded-lg mt-2 bg-green-500 p-4 w-full"
//               )}
//             >
//               <Text style={tw("font-bold text-xl uppercase")}>Total:</Text>
//               <Text style={tw("font-semibold text-lg")}>R$ 220,00</Text>
//             </View>
//           </View>
//         </View>

//         <View>
//           <hr />
//         </View>

//         <View
//           style={tw("flex flex-row gap-16 items-center justify-center px-4")}
//         >
//           {[
//             { title: "Telefone:", value: "(91) 3721 - 1772" },
//             { title: "Endereço:", value: "Av. Maximino Porpino, Centro, 3385" },
//             { title: "Site:", value: "nortegases.com" },
//           ].map(({ title, value }) => (
//             <View style={tw("flex gap-2 items-center")}>
//               <Text style={tw("font-semibold text-lg ")}>{title}</Text>
//               <Text style={tw("font-medium text-base")}>{value}</Text>
//             </View>
//           ))}
//         </View>
//       </Page>
//     </Document>
//   );
// }
