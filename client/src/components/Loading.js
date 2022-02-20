const Loading = ({ center, min }) => {
  return (
    <>
      {min ? (
        <div className={renderMinLoader(center)}></div>
      ) : (
        <div className={renderLoader(center)}></div>
      )}
    </>
  );
};

export default Loading;

const renderLoader = (center) => {
  return center ? 'loading loading-center' : 'loading';
};

const renderMinLoader = (center) => {
  return center ? 'loading-min loading-min-center' : 'loading-min';
};
