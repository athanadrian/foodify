import { Link } from 'react-router-dom';
import moment from 'moment';

import { FaRegFlag, FaRegCalendarPlus } from 'react-icons/fa';
import { GiPathDistance } from 'react-icons/gi';
import { FiMapPin } from 'react-icons/fi';
import { AiOutlineEuro } from 'react-icons/ai';
import { TiDocumentText } from 'react-icons/ti';
import { BsFillPinMapFill } from 'react-icons/bs';
import { MdOutlineUpdate } from 'react-icons/md';

import { useAppContext } from 'context/contexts/appContext';
import Wrapper from 'wrappers/FoodyDetail';
import FoodyInfo from './FoodyInfo';

import { mapEnumObject, computeDistance } from 'utils/functions';
import { costs, types, foodys } from 'utils/lookup-data';
import GoogleMapsLink from './GoogleMapsLink';
import { useFoodyContext } from 'context/contexts/foodyContext';

const FoodyDetail = () => {
  const { homeLocation } = useAppContext();
  const {
    foodyDetail,
    setFoodyToUpdate,
    deleteFoody,
    changeFoodyStatus,
    myLocation,
    isMyFoodys,
    toggleModal,
    showModal,
  } = useFoodyContext();

  const {
    _id,
    title,
    village,
    cuisine,
    cost,
    type,
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
  const typeObj = mapEnumObject(type, types);
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
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <GoogleMapsLink lat={foodyLocation.lat} lng={foodyLocation.lng} />
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
            tooltip='Preferable for'
            icon={typeObj.icon}
            label='Preferable'
            text={typeObj.text}
          />
          <FoodyInfo
            tooltip='Cuisine Origin'
            icon={<FaRegFlag />}
            label='Cuisine'
            text={cuisine}
          />
          <FoodyInfo
            tooltip='Type of Restaurant'
            icon={foodyObj.icon}
            label='Menu'
            text={foodyObj.text}
          />
          <div className='cost-container'>
            <FoodyInfo
              tooltip='Cost'
              icon={<AiOutlineEuro />}
              label='cost'
              text={costObj.icon}
            />
            <div className={`cost ${costObj.enum}`}>{costObj.enum}</div>
          </div>
          <FoodyInfo
            tooltip='remarks'
            icon={<TiDocumentText />}
            text='remarks'
          />
        </div>
        <div className='remarks-container'>
          <p className='remarks-text'>
            {remarks.length > 0 ? remarks : 'no remarks yet'}
          </p>
        </div>
        <FoodyInfo
          tooltip='Created'
          icon={<FaRegCalendarPlus />}
          label='Created'
          text={relativeCreated}
        />
        <FoodyInfo
          icon={<MdOutlineUpdate />}
          label='Updated'
          text={relativeUpdate}
          tooltip='Updated'
        />
        <footer>
          <div className='actions-container'>
            <button onClick={toggleModal} className='btn btn-block detail-btn'>
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
      </div>
    </Wrapper>
  );
};
export default FoodyDetail;
