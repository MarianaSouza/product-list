const Select = ({ value, handleChange, optionLabel, options }) => {
  return (
    <select value={value} onChange={handleChange}>
      <option value="">{optionLabel}</option>
      {Object.keys(options).map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
