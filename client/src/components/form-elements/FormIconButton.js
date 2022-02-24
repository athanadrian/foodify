const FormIconButton = ({
  Icon,
  className,
  type = 'button',
  tooltip,
  onClick,
  ...rest
}) => {
  return (
    <div className='form-row'>
      <button
        title={tooltip}
        type={type}
        className={`btn btn-block ${className}`}
        onClick={onClick}
        {...rest}
      >
        {Icon}
      </button>
    </div>
  );
};

export default FormIconButton;
