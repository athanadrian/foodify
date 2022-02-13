const FormTextArea = ({ labelText, handleChange, name, rows = 3, value }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <textarea
        type='text'
        name={name}
        className='form-textarea'
        onChange={handleChange}
        value={value}
        rows={rows}
      />
    </div>
  );
};

export default FormTextArea;
