import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FaRegFlag, FaRegCalendarPlus, FaHeart } from 'react-icons/fa';
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
  relativeDate,
  formatDate,
} from '../utils/functions';
import { costs, foodys } from '../utils/lookup-data';
import { LikesModal } from '.';
import Modal from './Modal';

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
  slug,
  location: foodyLocation,
  likes,
  // preference,
}) => {
  const {
    foodyDetail,
    setFoodyToUpdate,
    deleteFoody,
    changeFoodyStatus,
    homeLocation,
    myLocation,
    isMyFoodys,
    toggleModal,
    getFoody,
    //getFoodyLikes,
  } = useAppContext();

  const [showRemarks, setShowRemarks] = useState(false);
  const [openLikesModal, setOpenLikesModal] = useState(false);
  const [calcLocation, setCalcLocation] = useState(false);
  const [distance, setDistance] = useState(
    computeDistance(homeLocation, foodyLocation)
  );
  const costObj = mapEnumObject(cost, costs);
  const foodyObj = mapEnumObject(foody, foodys);
  const isPublished = status === 'published';
  const isLiked = likes.length > 0;

  const toggleLocation = () => {
    setCalcLocation(!calcLocation);
  };

  const toggleLikesModal = () => {
    setOpenLikesModal(!openLikesModal);
  };

  const calcDistanceMyLocation = () => {
    console.log('current');
    toggleLocation();
    if (myLocation.loaded)
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

  const showFoodyDetails = () => {
    getFoody(slug);
    toggleModal();
  };

  const handleLikes = () => {
    toggleLikesModal();
  };

  return (
    <>
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
              text={`${!calcLocation ? '(Home)' : '(Current)'} ${distance} Km`}
            />
            <FoodyInfo
              tooltip='Created'
              icon={<FaRegCalendarPlus />}
              text={formatDate(createdAt)}
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
              <p className='remarks-text'>
                {remarks.length > 0 ? remarks : 'no remarks yet'}
              </p>
            </div>
          )}
          <footer>
            <div className='actions-container'>
              <button onClick={showFoodyDetails} className='btn detail-btn'>
                details
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

          <div className='like-container'>
            <div className={'space-between'}>
              <div
                className={`${
                  isLiked ? 'space-between liked' : 'space-between'
                }`}
              >
                <span className='center' onClick={handleLikes}>
                  <FaHeart size={24} />
                </span>
                {!isLiked ? (
                  <span> Not liked yet</span>
                ) : (
                  <span>
                    {likes.length} Like{likes.length === 1 ? '' : 's'}
                  </span>
                )}
              </div>
              <FoodyInfo
                className='content-update'
                icon={<MdOutlineUpdate size={22} />}
                text={relativeDate(updatedAt)}
                tooltip='Updated'
              />
            </div>
          </div>
        </div>
        <div>
          <Modal open={openLikesModal} onClose={toggleLikesModal} center>
            <LikesModal likes={likes} />
          </Modal>
        </div>
      </Wrapper>
    </>
  );
};
export default Foody;
