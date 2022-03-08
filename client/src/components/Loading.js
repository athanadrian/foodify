const Loading = ({ center, min, mid, max, text }) => {
  return (
    <>
      <Loader text={text}>
        {min && <div className={renderMinLoader(center)} />}
        {mid && <div className={renderMidLoader(center)} />}
        {max && <div className={renderLoader(center)} />}
      </Loader>
    </>
  );
};

export default Loading;

const Loader = ({ children, text }) => (
  <div className='center'>
    {children}
    {text && <span className='loading-text'>{text}...</span>}
  </div>
);

const renderLoader = (center) => {
  return center ? 'loading loading-center' : 'loading';
};
const renderMidLoader = (center) => {
  return center ? 'loading-mid loading-mid-center' : 'loading-mid';
};
const renderMinLoader = (center) => {
  return center ? 'loading-min loading-min-center' : 'loading-min';
};
