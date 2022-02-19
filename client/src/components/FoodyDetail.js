import { Link } from 'react-router-dom';
import moment from 'moment';

import { FaRegFlag, FaRegCalendarPlus } from 'react-icons/fa';
import { GiPathDistance } from 'react-icons/gi';
import { FiMapPin } from 'react-icons/fi';
import { AiOutlineEuro } from 'react-icons/ai';
import { TiDocumentText } from 'react-icons/ti';
import { BsFillPinMapFill } from 'react-icons/bs';
import { MdOutlineUpdate, MdOutlineRestaurant } from 'react-icons/md';

import { useAppContext } from '../context/appContext';
import Wrapper from '../wrappers/FoodyDetail';
import FoodyInfo from './FoodyInfo';

import {
  mapEnumObject,
  //getFoodyDistance,
  //getPreciseFoodyDistance,
  computeDistance,
} from '../utils/functions';
import { costs, foodys } from '../utils/lookup-data';

const FoodyDetail = () => {
  const {
    foodyDetail,
    setFoodyToUpdate,
    deleteFoody,
    changeFoodyStatus,
    homeLocation,
    myLocation,
    isMyFoodys,
    toggleModal,
    showModal,
  } = useAppContext();
  const {
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
    location: foodyLocation,
  } = foodyDetail;

  const relativeUpdate = moment(updatedAt).startOf('day').fromNow();
  const relativeCreated = moment(createdAt).startOf('day').fromNow();
  const costObj = mapEnumObject(cost, costs);
  const foodyObj = mapEnumObject(foody, foodys);
  const isPublished = status === 'published';
  const distanceFromMyLocation = computeDistance(
    myLocation.coordinates,
    foodyLocation
  );
  const distanceFromHomeLocation = computeDistance(homeLocation, foodyLocation);
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{title.charAt(0)}</div>
        <div className='header-items'>
          <div className='info'>
            <h5>{title}</h5>
            <p>{village}</p>
          </div>
          {/* <div className={`status ${status}`}>{status}</div> */}
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <FoodyInfo
            tooltip='Village'
            icon={<FiMapPin size={20} />}
            label='village'
            text={village}
          />
          <FoodyInfo
            tooltip='Distance from current location'
            icon={<BsFillPinMapFill size={20} />}
            label='from current'
            text={`${distanceFromMyLocation} Km`}
          />
          <FoodyInfo
            tooltip='Distance from given home location'
            icon={<GiPathDistance size={20} />}
            label='from home'
            text={`${distanceFromHomeLocation} Km`}
          />
          <FoodyInfo
            tooltip='Cuisine Origin'
            icon={<FaRegFlag />}
            label='Cuisine'
            text={cuisine}
          />
          <FoodyInfo
            tooltip='Type of Restaurant'
            icon={<MdOutlineRestaurant size={20} />}
            label='style'
            text={foodyObj.text}
          />
          <div className='cost-container'>
            <FoodyInfo
              tooltip='Cost'
              icon={<AiOutlineEuro size={22} />}
              label='cost'
              text={costObj.icon}
            />
            <div className={`cost ${costObj.enum}`}>{costObj.enum}</div>
          </div>
          <FoodyInfo
            tooltip='remarks'
            icon={<TiDocumentText size={22} />}
            text='remarks'
          />
        </div>
        <div className='remarks-container'>
          <p className='remarks-text'>
            {remarks.length > 0 ? remarks : 'no remarks yet'}
          </p>
        </div>
        <footer>
          <div className='actions-container'>
            <button onClick={toggleModal} className='btn detail-btn'>
              {showModal ? 'close' : 'details'}
            </button>
            {isMyFoodys && (
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
            )}
          </div>
        </footer>
        <div className='dates-container'>
          <FoodyInfo
            className='content-update'
            tooltip='Created'
            icon={<FaRegCalendarPlus />}
            label='Created'
            text={relativeCreated}
          />
          <FoodyInfo
            className='content-update'
            icon={<MdOutlineUpdate size={21} />}
            label='Updated'
            text={relativeUpdate}
            tooltip='Updated'
          />
        </div>
      </div>
    </Wrapper>
  );
};
export default FoodyDetail;