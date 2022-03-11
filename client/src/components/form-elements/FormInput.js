const FormInput = ({
  className,
  labelText,
  handleChange,
  name,
  type,
  value,
  ...rest
}) => {
  return (
    <div className={`form-row ${className}`}>
      <label htmlFor={name} className='form-label space-between'>
        {labelText || name}
      </label>
      <input
        className='form-input'
        name={name}
        onChange={handleChange}
        type={type}
        value={value}
        {...rest}
      />
    </div>
  );
};

export default FormInput;
