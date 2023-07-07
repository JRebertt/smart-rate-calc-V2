"use client";

import React from "react";
import Select from "react-select";

type SelectFieldProps = {
  label?: string;
  isMulti?: boolean;
  options: { value: string; label: string }[];
  value: any;
  onChange:
    | ((selectedItems: readonly { value: string }[] | null) => void)
    | ((selectedItem: any) => void);
};

export function SelectField({
  label,
  isMulti,
  options,
  value,
  onChange,
}: SelectFieldProps) {
  return (
    <div className="mb-4">
      <label className="font-semibold">{label}</label>
      <Select
        isMulti={isMulti}
        options={options}
        value={value}
        onChange={onChange}
        noOptionsMessage={() => "Produto não encontrado"}
      />
    </div>
  );
}