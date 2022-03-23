import Wrapper from 'wrappers/FoodyInfo';

const FoodyInfo = ({ end, label, onClick, icon, tooltip, text, className }) => {
  return (
    <Wrapper justify={end ? 'end' : 'start'} onClick={onClick}>
      <span title={tooltip} className='icon'>
        {icon}
      </span>
      {label && <span className='label'>{label}:&nbsp;</span>}
      <span className='text'>{text}</span>
    </Wrapper>
  );
};

export default FoodyInfo;
