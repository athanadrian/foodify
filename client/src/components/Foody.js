import { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { FaRegFlag, FaRegCalendarPlus } from 'react-icons/fa';
import { GiPathDistance } from 'react-icons/gi';
import { FiMapPin } from 'react-icons/fi';
import { AiOutlineEuro } from 'react-icons/ai';
import { BsChevronDown, BsChevronUp, BsFillPinMapFill } from 'react-icons/bs';
import { MdOutlineUpdate, MdOutlineRestaurant } from 'react-icons/md';

import { useAppContext } from '../context/appContext';
import Wrapper from '../wrappers/Foody';
import FoodyInfo from './FoodyInfo';
import {
  mapEnumObject,
  //getFoodyDistance,
  //getPreciseFoodyDistance,
  computeDistance,
} from '../utils/functions';
import { costs, foodys } from '../utils/lookup-data';

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
  location: foodyLocation,
  // preference,
}) => {
  const {
    setFoodyToUpdate,
    deleteFoody,
    changeFoodyStatus,
    homeLocation,
    myLocation,
  } = useAppContext();
  const [showRemarks, setShowRemarks] = useState(false);
  const [calcLocation, setCalcLocation] = useState(false);
  const [distance, setDistance] = useState(
    computeDistance(homeLocation, foodyLocation)
  );
  const createDate = moment(createdAt).format('MMM Do YYYY');
  const relativeUpdate = moment(updatedAt).startOf('day').fromNow();
  const costObj = mapEnumObject(cost, costs);
  const foodyObj = mapEnumObject(foody, foodys);
  const isPublished = status === 'published';

  const toggleLocation = () => {
    setCalcLocation(!calcLocation);
  };

  const calcDistanceMyLocation = () => {
    console.log('current');
    toggleLocation();
    setDistance(computeDistance(myLocation.coordinates, foodyLocation));
  };

  const calcDistanceHomeLocation = () => {
    console.log('home');
    toggleLocation();
    setDistance(computeDistance(homeLocation, foodyLocation));
  };

  let calculationConfig = calcLocation
    ? {
        Icon: BsFillPinMapFill,
        TopIcon: GiPathDistance,
        iconColor: '#0369a1',
        func: calcDistanceHomeLocation,
        text: 'CURRENT',
      }
    : {
        Icon: GiPathDistance,
        TopIcon: BsFillPinMapFill,
        iconColor: '#92400e',
        func: calcDistanceMyLocation,
        text: 'HOME',
      };

  return (
    <Wrapper iconColor={calculationConfig.iconColor}>
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
          <div className='location' onClick={calculationConfig.func}>
            <calculationConfig.TopIcon />
          </div>
          {/* <div className={`status ${status}`}>{status}</div> */}
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <FoodyInfo
            tooltip='Distance from home'
            icon={<calculationConfig.Icon size={24} />}
            text={`${distance} Km -> ${!calcLocation ? 'HOME' : 'CURRENT'}`}
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
