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
          {labelText || name} <span className='distance-value'>{value} </span>
        </p>
      </label>
      <input
        className='form-input'
        type='range'
        name={name}
        min={min} //{min_distance}
        max={max} //{max_distance}
        onChange={handleChange}
        value={value}
        {...rest}
      />
    </div>
  );
};

export default FormRangeInput;
