interface InputProps {
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ type = "text", value, onChange }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="text-white p-2 rounded-md border border-gray-600 bg-gray-800"
    />
  );
}

export default Input;
