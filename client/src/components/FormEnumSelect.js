const FormEnumSelect = ({
  all,
  labelText,
  name,
  value,
  handleChange,
  list,
}) => {
  if (all) {
    list = [
      {
        desc: 'all',
        enum: 'all',
        icon: 'all',
        id: 0,
        text: 'all',
      },
      ...list,
    ];
  }
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className='form-select'
      >
        {list.map((itemValue) => {
          return (
            <option key={itemValue.id} value={itemValue.enum}>
              {itemValue.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormEnumSelect;
