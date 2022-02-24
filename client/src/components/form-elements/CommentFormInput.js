const CommentFormInput = ({ handleChange, name, type, value, ...rest }) => {
  return (
    <div className={`form-row comment-row`}>
      <input
        className='form-input comment-input'
        name={name}
        onChange={handleChange}
        type={type}
        value={value}
        {...rest}
      />
    </div>
  );
};

export default CommentFormInput;
