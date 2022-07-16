export function Button({ method, background, icon, color, text }) {
  return (
    <button
      style={{ backgroundColor: background, color: color }}
      className={`border-2 w-full p-2 rounded-md mb-3 flex 
      justify-center items-center`}
      onClick={() => method()}
    >
      {icon && <img src={icon} width="20" className="mr-3" />}
      {text}
    </button>
  );
}
