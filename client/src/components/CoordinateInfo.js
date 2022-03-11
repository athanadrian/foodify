import Wrapper from 'wrappers/CoordinateInfo';

const CoordinateInfo = ({ onClick, coord, icon, tooltip, text, className }) => {
  return (
    <Wrapper className={className} onClick={onClick}>
      <span title={tooltip} className='icon'>
        {icon}
      </span>
      <span className='coord'>{coord}</span>
      <span className='text'>{text}</span>
    </Wrapper>
  );
};

export default CoordinateInfo;
