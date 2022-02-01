import moment from 'moment';
import { FaRegFlag, FaRegCalendarPlus } from 'react-icons/fa';
import { GiPathDistance } from 'react-icons/gi';
import { FiMapPin } from 'react-icons/fi';
import { AiOutlineEuro } from 'react-icons/ai';
import { MdOutlineUpdate, MdOutlineRestaurant } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

import Wrapper from '../wrappers/Foody';
import FoodyInfo from './FoodyInfo';
import { mapEnumObject } from '../utils/functions';
import costs from '../utils/costs';
const Foody = ({
  _id,
  title,
  village,
  cuisine,
  cost,
  createdAt,
  updatedAt,
  foody,
  status,
  preference,
}) => {
  const { editFoody, deleteFoody } = useAppContext();
  const createDate = moment(createdAt).format('MMM Do YYYY');
  const relativeUpdate = moment(updatedAt).startOf('day').fromNow();
  console.log(relativeUpdate);
  const costObj = mapEnumObject(cost, costs);
  console.log('costObj', costObj);
  console.log('cost', cost);
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{title.charAt(0)}</div>
        <div className='header-items'>
          <div className='info'>
            <h5>{title}</h5>
            <FoodyInfo
              tooltip='Village'
              icon={<FiMapPin size={20} />}
              text={village}
            />
          </div>
          <div className={`status ${status}`}>{status}</div>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <FoodyInfo
            tooltip='Distance'
            icon={<GiPathDistance size={24} />}
            text={`13 Km`}
          />
          <FoodyInfo
            tooltip='Created'
            icon={<FaRegCalendarPlus />}
            text={createDate}
          />
          <FoodyInfo
            tooltip='Cuisine Origin'
            icon={<FaRegFlag />}
            text={cuisine}
          />
          <FoodyInfo
            tooltip='Type of Restaurant'
            icon={<MdOutlineRestaurant size={20} />}
            text={foody}
          />
          <FoodyInfo
            tooltip='Cost'
            icon={<AiOutlineEuro size={22} />}
            text={costObj.icon}
          />
          <div className={`cost ${costObj.text}`}>{costObj.text}</div>
          <div className={`preference ${preference}`}>{preference}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-foody'
              onClick={() => editFoody(_id)}
              className='btn edit-btn'
            >
              edit
            </Link>
            <button
              onClick={() => deleteFoody(title)}
              className='btn delete-btn'
            >
              delete
            </button>
          </div>
        </footer>
        <FoodyInfo
          className='content-update'
          icon={<MdOutlineUpdate size={22} />}
          text={relativeUpdate}
          tooltip='Updated'
        />
      </div>
    </Wrapper>
  );
};
export default Foody;
