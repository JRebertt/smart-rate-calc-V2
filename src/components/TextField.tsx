import { UseFormRegisterReturn } from "react-hook-form";

type TextFieldProps = {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
};

export function TextField({ label, name, register }: TextFieldProps) {
  return (
    <div className="mb-4">
      <label className="font-semibold">{label}</label>
      <input
        {...register}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
