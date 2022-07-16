export default function FormInput({
  type,
  label,
  name,
  placeholder,
  setValue,
  borderColor,
}) {
  return (
    <div className="mb-8 w-full">
      <label htmlFor={name} className={`self-start text-lg font-semibold mb-2`}>
        {label}
      </label>
      <input
        className={`border-2 rounded-md p-3 w-full border-${borderColor}`}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
