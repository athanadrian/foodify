const FormInput = ({ labelText, handleChange, name, type, value, ...rest }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
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
