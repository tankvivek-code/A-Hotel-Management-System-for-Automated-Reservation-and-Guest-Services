import { useNavigate } from "react-router-dom";

const PrimaryButton = ({
  text,
  type = "button",
  navigate,
  onClick,
  className = "",
}) => {
  const nav = useNavigate();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (navigate) nav(navigate);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`px-4 py-2 rounded transition ${className}`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
