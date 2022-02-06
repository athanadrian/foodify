import moment from 'moment';
import { FaRegFlag, FaRegCalendarPlus } from 'react-icons/fa';
import { GiPathDistance } from 'react-icons/gi';
import { FiMapPin } from 'react-icons/fi';
import { AiOutlineEuro } from 'react-icons/ai';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdOutlineUpdate, MdOutlineRestaurant } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

import Wrapper from '../wrappers/Foody';
import FoodyInfo from './FoodyInfo';
import { mapEnumObject } from '../utils/functions';
import { costs, foodys } from '../utils/lookup-data';
import { useState } from 'react';
const Foody = ({
  all,
  _id,
  title,
  village,
  cuisine,
  cost,
  createdAt,
  updatedAt,
  foody,
  status,
  remarks,
  // preference,
}) => {
  const { setFoodyToUpdate, deleteFoody, changeFoodyStatus } = useAppContext();
  const [showRemarks, setShowRemarks] = useState(false);
  const createDate = moment(createdAt).format('MMM Do YYYY');
  const relativeUpdate = moment(updatedAt).startOf('day').fromNow();
  const costObj = mapEnumObject(cost, costs);
  const foodyObj = mapEnumObject(foody, foodys);
  const isPublished = status === 'published';
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
          {/* <div className={`status ${status}`}>{status}</div> */}
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <FoodyInfo
            tooltip='Distance'
            icon={<GiPathDistance size={24} />}
            text={`Coming soon...`}
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
            text={foodyObj.text}
          />
          <FoodyInfo
            tooltip='Cost'
            icon={<AiOutlineEuro size={22} />}
            text={costObj.icon}
          />
          <div className={`cost ${costObj.enum}`}>{costObj.enum}</div>
          <FoodyInfo
            tooltip='remarks'
            icon={
              showRemarks ? (
                <BsChevronUp size={22} />
              ) : (
                <BsChevronDown size={22} />
              )
            }
            text='remarks'
            onClick={() => setShowRemarks(!showRemarks)}
          />
        </div>
        {showRemarks && (
          <div className='remarks-container'>
            <p className='remarks-text'>{remarks}</p>
          </div>
        )}
        {!all && (
          <footer>
            <div className='actions'>
              <Link
                to='/add-foody'
                onClick={() => setFoodyToUpdate(_id)}
                className='btn edit-btn'
              >
                edit
              </Link>
              <button
                onClick={() => deleteFoody(_id)}
                className='btn delete-btn'
              >
                delete
              </button>
              {!isPublished ? (
                <button
                  onClick={() => changeFoodyStatus(_id, 'published')}
                  className='btn publish-btn'
                >
                  publish
                </button>
              ) : (
                <button
                  onClick={() => changeFoodyStatus(_id, 'unpublished')}
                  className='btn unpublish-btn'
                >
                  unpublish
                </button>
              )}
            </div>
          </footer>
        )}
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
