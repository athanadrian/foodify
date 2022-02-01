const FormInput = ({ labelText, handleChange, name, type, value }) => {
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
      />
    </div>
  );
};

export default FormInput;
