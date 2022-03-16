const FormRangeInput = ({
  labelText,
  handleChange,
  name,
  type,
  value,
  min,
  max,
  ...rest
}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        <p className='distance'>
          Foodys
          <span className='distance-value'>{value}</span> Km from me
        </p>
      </label>
      <input
        className='range'
        type='range'
        name={name}
        min={min}
        max={max}
        onChange={handleChange}
        value={value}
        {...rest}
      />
    </div>
  );
};

export default FormRangeInput;
