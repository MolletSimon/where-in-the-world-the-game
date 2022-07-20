export function Button({
  method,
  background,
  icon,
  color,
  text,
  disabled,
  padding,
}) {
  return (
    <button
      disabled={disabled}
      style={{
        backgroundColor: disabled ? `#858585` : background,
        cursor: disabled ? "not-allowed" : "pointer",
        color: color,
        padding: padding ? padding : 12,
      }}
      className={`border-2 w-full rounded-md mb-3 flex 
      justify-center items-center`}
      onClick={() => method()}
    >
      {icon && <img src={icon} width="20" className="mr-3" alt="google-icon" />}
      {text}
    </button>
  );
}
