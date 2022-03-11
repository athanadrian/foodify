import { relativeDate } from 'utils/functions';
import Wrapper from 'wrappers/SocialModal';

const VisitsModal = ({ visits }) => {
  return (
    <Wrapper>
      <div className='socials-container'>
        <div className='socials-container-center'>
          {visits.length > 0 &&
            visits.map((visit) => <ListItem key={visit._id} visit={visit} />)}
        </div>
      </div>
    </Wrapper>
  );
};

export default VisitsModal;

const ListItem = ({ visit }) => {
  const {
    user: { name, email },
    date,
  } = visit;
  return (
    <div className='social-container'>
      <div className='profile-icon'>{name.charAt(0)}</div>
      <div className='profile-info'>
        <div className='info-container'>
          <h5>{name}</h5>
          <p>{email}</p>
        </div>
        <p>
          <span className='social-text'>Visited: </span>
          <span className='social-date'>{relativeDate(date)}</span>
        </p>
      </div>
    </div>
  );
};
