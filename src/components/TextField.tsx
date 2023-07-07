type TextFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
};

export function TextField({ label, name, value, onChange }: TextFieldProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <label className="font-semibold">{label}</label>
      <input
        name={name}
        value={value}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
