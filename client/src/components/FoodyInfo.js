import Wrapper from 'wrappers/FoodyInfo';

const FoodyInfo = ({ label, onClick, icon, tooltip, text, className }) => {
  return (
    <Wrapper className={className} onClick={onClick}>
      <span title={tooltip} className='icon'>
        {icon}
      </span>
      {label && <span className='label'>{label}:&nbsp;</span>}
      <span className='text'>{text}</span>
    </Wrapper>
  );
};

export default FoodyInfo;
