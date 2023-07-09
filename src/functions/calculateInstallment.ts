export const calculateInstallment = (
  price: number,
  numberOfInstallments: number,
  data: Array<{ Parcelamento: string; Rede?: number; Ton?: number }>
): number => {
  const percentage = data.find(
    (item) => item.Parcelamento === `${numberOfInstallments}x`
  )?.Rede;

  if (percentage == null) {
    return price / numberOfInstallments;
  }

  const installmentValue = (price * (1 + percentage / 100)) / numberOfInstallments;

  return installmentValue;
};
