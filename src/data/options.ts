export const options = [
  { value: "option1", label: "Opção 1" },
  { value: "option2", label: "Opção 2" },
  { value: "option3", label: "Opção 3" },
];

export const data = [
  { Parcelamento: "1x", Rede: 3.29 },
  { Parcelamento: "2x", Rede: 5.47 },
  { Parcelamento: "3x", Ton: 6.29 },
  { Parcelamento: "4x", Ton: 7.15 },
  { Parcelamento: "5x", Ton: 7.99 },
  { Parcelamento: "6x", Ton: 8.79 },
  { Parcelamento: "7x", Ton: 9.59 },
  { Parcelamento: "8x", Ton: 10.39 },
  { Parcelamento: "9x", Ton: 11.19 },
  { Parcelamento: "10x", Ton: 11.99 },
  { Parcelamento: "11x", Ton: 12.79 },
  { Parcelamento: "12x", Ton: 13.49 },
];

export const flagOptions = [
  { value: "mastercard", label: "Mastercard" },
  { value: "visa", label: "Visa" },
  { value: "elo", label: "Elo" },
];

export const installmentOptions = Array.from({ length: 12 }, (_, i) => ({
  value: (i + 1).toString(),
  label: `${i + 1}x`,
}));

export const paymentOptions = [
  { value: "avista", label: "Avista" },
  { value: "parcelado", label: "Parcelado" },
];