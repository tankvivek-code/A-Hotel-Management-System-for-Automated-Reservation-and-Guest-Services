const Primaryinput = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  disabled = false,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`
        w-full
        px-4 py-2.5
        rounded-lg
        border border-gray-300
        bg-white
        text-gray-700
        text-sm md:text-base
        focus:outline-none
        focus:ring-2 focus:ring-blue-500
        focus:border-blue-500
        transition duration-200
        disabled:bg-gray-100
        disabled:cursor-not-allowed
        disabled:opacity-70
      `}
    />
  );
};

export default Primaryinput;
