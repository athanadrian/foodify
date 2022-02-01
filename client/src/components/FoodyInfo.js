import Wrapper from '../wrappers/FoodyInfo';

const FoodyInfo = ({ icon, tooltip, text, className }) => {
  return (
    <Wrapper className={className}>
      <span title={tooltip} className='icon'>
        {icon}
      </span>
      <span className='text'>{text}</span>
    </Wrapper>
  );
};

export default FoodyInfo;
