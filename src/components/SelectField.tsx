import Select from "react-select";
import { UseFormSetValue, UseFormRegisterReturn } from "react-hook-form";

type SelectFieldProps = {
  label?: string;
  name: string;
  isMulti?: boolean;
  options: { value: string; label: string }[];
  value: any;
  setValue: UseFormSetValue<any>;
  register: UseFormRegisterReturn;
  error?: string;
};

export function SelectField({
  label,
  name,
  isMulti,
  options,
  value,
  setValue,
  register,
  error,
}: SelectFieldProps) {
  const handleChange = (selectedItem: any) => {
    if (isMulti) {
      setValue(
        name,
        selectedItem ? selectedItem.map((item: any) => item.value) : []
      );
    } else {
      setValue(name, selectedItem ? selectedItem.value : null);
    }
  };

  return (
    <div className="mb-4">
      <label className="font-semibold">{label}</label>
      <Select
        {...register}
        isMulti={isMulti}
        options={options}
        value={value}
        onChange={handleChange}
        noOptionsMessage={() => "Produto não encontrado"}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
