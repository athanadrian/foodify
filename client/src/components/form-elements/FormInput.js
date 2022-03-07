import { useAppContext } from 'context/appContext';

const FormInput = ({
  className,
  labelText,
  handleChange,
  name,
  type,
  value,
  hasAlert,
  ...rest
}) => {
  const { alertText, isUsernameAvailable } = useAppContext();
  return (
    <div className={`form-row ${className}`}>
      <label htmlFor={name} className='form-label space-between'>
        {labelText || name}
        {hasAlert && !isUsernameAvailable && alertText && (
          <span className='form-error'>{`⚠ ${alertText}`}</span>
        )}
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
