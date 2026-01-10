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
      className="border px-3 py-2 rounded w-full"
    />
  );
};

export default Primaryinput;
