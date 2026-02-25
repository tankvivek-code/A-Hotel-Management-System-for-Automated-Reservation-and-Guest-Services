import { useNavigate } from "react-router-dom";

const PrimaryButton = ({
  text,
  type = "button",
  navigate,
  onClick,
  variant = "primary", // 👈 NEW
  className = "",
  disabled = false,
}) => {
  const nav = useNavigate();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (navigate) nav(navigate);
  };

  const baseStyle = `
    px-5 py-2.5
    rounded-lg
    text-sm md:text-base
    font-medium
    transition-all duration-200
    active:scale-95
    disabled:bg-gray-400
    disabled:cursor-not-allowed
  `;

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",

    secondary:
      "bg-white text-green-800 border border-slate-300 hover:bg-slate-100 shadow-md",

    danger: "bg-red-600 text-white hover:bg-red-700 shadow-md",
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
