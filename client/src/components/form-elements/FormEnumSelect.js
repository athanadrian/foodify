const FormEnumSelect = ({
  allOption,
  labelText,
  name,
  value,
  handleChange,
  list,
}) => {
  if (allOption) {
    list = [
      {
        desc: 'all',
        enum: 'all',
        icon: 'all',
        id: 0,
        text: 'All',
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
