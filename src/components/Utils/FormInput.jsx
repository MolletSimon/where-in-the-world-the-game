import { useState } from "react";

export default function FormInput({
  type,
  label,
  name,
  placeholder,
  setValue,
  borderColor,
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-6 w-full">
      <label htmlFor={name} className={`self-start text-lg font-semibold mb-2`}>
        {label}
      </label>
      {type === "password" ? (
        <div className="flex items-center">
          <input
            style={{ border: `2px solid ${borderColor}` }}
            className={`border-2 rounded-md p-3 w-full`}
            type={`${show ? "text" : "password"}`}
            name={name}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
          />
          <span
            className="ml-[-35px] text-ligthInput material-symbols-outlined cursor-pointer"
            onClick={() => setShow(!show)}
          >
            {show ? "visibility_off" : "visibility"}
          </span>
        </div>
      ) : (
        <input
          style={{ border: `2px solid ${borderColor}` }}
          className={`border-2 rounded-md p-3 w-full`}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </div>
  );
}
