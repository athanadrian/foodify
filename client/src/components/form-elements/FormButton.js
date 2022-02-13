const FormButton = ({
  Icon,
  iconSize,
  labelText,
  btnText,
  className,
  type = 'button',
  onClick,
  ...rest
}) => {
  return (
    <div className={`${Icon ? 'form-row icon-btn' : 'form-row'}`}>
      <label className={`${Icon ? 'form-label icon' : 'form-label'}`}>
        {Icon ? <Icon size={iconSize} /> : labelText}
      </label>
      <button
        type={type}
        className={`btn btn-block ${className}`}
        onClick={onClick}
        {...rest}
      >
        {btnText}
      </button>
    </div>
  );
};

export default FormButton;
