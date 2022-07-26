import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FaRegCalendarPlus } from 'react-icons/fa';
import { AiOutlineComment, AiOutlineEuro, AiOutlineHome } from 'react-icons/ai';
import {
  BsChevronDown,
  BsChevronUp,
  BsFillTelephoneFill,
} from 'react-icons/bs';
import { MdOutlineUpdate } from 'react-icons/md';
import { RiMapPinUserLine } from 'react-icons/ri';

import { useAppContext } from 'context/contexts/appContext';
import Wrapper from 'wrappers/MapFoody';
import FoodyInfo from './FoodyInfo';
import {
  mapEnumObject,
  computeDistance,
  relativeDate,
  formatDate,
} from 'utils/functions';
import { costs, menus, types, cuisines } from 'utils/lookup-data';
import {
  LikesModal,
  VisitsModal,
  Modal,
  LikeButton,
  VisitButton,
  CommentsModal,
  GoogleMapsLink,
} from '.';
import { useFoodyContext } from 'context/contexts/foodyContext';

const MapFoody = ({
  map,
  _id,
  title,
  village,
  phone,
  cuisine,
  type,
  cost,
  createdAt,
  updatedAt,
  menu,
  status,
  remarks,
  slug,
  location: foodyLocation,
  likes,
  visits,
  comments,
}) => {
  const { user, homeLocation } = useAppContext();
  const {
    setFoodyToUpdate,
    deleteFoody,
    changeFoodyStatus,
    myLocation,
    isMyFoodys,
    toggleModal,
    getFoody,
  } = useFoodyContext();

  const notSetFoodyLocation =
    foodyLocation.lat === 0 && foodyLocation.lng === 0;

  const [showRemarks, setShowRemarks] = useState(false);
  const [openLikesModal, setOpenLikesModal] = useState(false);
  const [openVisitsModal, setOpenVisitsModal] = useState(false);
  const [openCommentsModal, setOpenCommentsModal] = useState(false);
  const [calcLocation, setCalcLocation] = useState(false);
  const [distance, setDistance] = useState(
    computeDistance(homeLocation, foodyLocation)
  );
  const costObj = mapEnumObject(cost, costs);
  const menuObj = mapEnumObject(menu, menus);
  const typeObj = mapEnumObject(type, types);
  const cuisineObj = mapEnumObject(cuisine, cuisines);
  const isPublished = status === 'published';
  const isLiked = likes.filter((like) => like.user._id === user._id).length > 0;
  const isVisited =
    visits.filter((visit) => visit.user._id === user._id).length > 0;
  const hasLikes = likes.length > 0;
  const hasVisits = visits.length > 0;
  const hasComments = comments.length > 0;

  const toggleLocation = () => {
    setCalcLocation(!calcLocation);
  };

  const toggleLikesModal = () => {
    setOpenLikesModal(!openLikesModal);
  };
  const toggleVisitsModal = () => {
    setOpenVisitsModal(!openVisitsModal);
  };
  const toggleCommentsModal = () => {
    setOpenCommentsModal(!openCommentsModal);
  };

  const calcDistanceMyLocation = () => {
    toggleLocation();
    if (myLocation.loaded)
      setDistance(computeDistance(myLocation.coordinates, foodyLocation));
  };

  const calcDistanceHomeLocation = () => {
    toggleLocation();
    setDistance(computeDistance(homeLocation, foodyLocation));
  };

  let calculationConfig = calcLocation
    ? {
        Icon: RiMapPinUserLine,
        tooltip: 'Distance from current location',
        TopIcon: AiOutlineHome,
        tooltipTopIcon: 'Calculate distance from home',
        iconColor: '#0369a1',
        func: calcDistanceHomeLocation,
        text: `${notSetFoodyLocation ? 'not set' : 'Current'}`,
      }
    : {
        Icon: AiOutlineHome,
        tooltip: 'Distance from home',
        TopIcon: RiMapPinUserLine,
        tooltipTopIcon: 'Calculate distance from current location',
        iconColor: '#92400e',
        func: calcDistanceMyLocation,
        text: 'Home',
      };

  const showFoodyDetails = () => {
    getFoody(slug);
    toggleModal();
  };

  const handleLikes = () => {
    toggleLikesModal();
  };

  const handleVisits = () => {
    toggleVisitsModal();
  };

  return (
    <>
      <Wrapper iconColor={calculationConfig.iconColor}>
        <div className='map-container'>
          <header>
            <div className='main-icon'>{title.charAt(0)}</div>
            <div className='header-items'>
              <div className='info center'>
                <div>
                  <h5>{title}</h5>
                  <p className='center'>
                    {village}{' '}
                    {phone && (
                      <a className='phone-number' href={`tel:${phone}`}>
                        {' '}
                        - {phone} <BsFillTelephoneFill />
                      </a>
                    )}
                  </p>
                </div>
              </div>
              <div
                title={calculationConfig.tooltipTopIcon}
                className='location'
                onClick={calculationConfig.func}
              >
                <calculationConfig.TopIcon />
              </div>
            </div>
          </header>
          <div className='content'>
            <GoogleMapsLink lat={foodyLocation.lat} lng={foodyLocation.lng} />
            <div className='content-center'>
              <>
                <FoodyInfo
                  tooltip='Created'
                  icon={<FaRegCalendarPlus />}
                  text={formatDate(createdAt)}
                />
                <FoodyInfo
                  icon={<MdOutlineUpdate />}
                  text={relativeDate(updatedAt)}
                  tooltip='Updated'
                  end
                />
              </>
              <FoodyInfo
                tooltip='Cuisine Origin'
                icon={cuisineObj.icon}
                text={cuisineObj.text}
              />
              <FoodyInfo
                tooltip='Type of Restaurant'
                icon={menuObj.icon}
                text={menuObj.text}
                end
              />
              <FoodyInfo
                tooltip={calculationConfig.tooltip}
                icon={<calculationConfig.Icon />}
                text={renderDistanceText(notSetFoodyLocation, distance)}
              />
              <FoodyInfo
                tooltip={calculationConfig.tooltip}
                icon={typeObj.icon}
                text={typeObj.text}
                end
              />
              <FoodyInfo
                tooltip='Cost'
                icon={<AiOutlineEuro />}
                text={costObj.icon}
              />
              <div className={`cost ${costObj.enum} center`}>
                {costObj.enum}
              </div>
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
            <div className='like-container map-social'>
              <div className='social-btn-container'>
                <LikeButton
                  size={22}
                  isLiked={isLiked}
                  foodyId={_id}
                  userId={user._id}
                >
                  {!hasLikes ? (
                    <span className='action-label'> No likes</span>
                  ) : (
                    <span
                      className='likes-btn action-label'
                      onClick={handleLikes}
                    >
                      {likes.length} Like{renderText(likes.length)}
                    </span>
                  )}
                </LikeButton>
                <VisitButton
                  size={22}
                  isVisited={isVisited}
                  foodyId={_id}
                  userId={user._id}
                >
                  {!hasVisits ? (
                    <span className='action-label'> No Visits</span>
                  ) : (
                    <span
                      className='visits-btn action-label'
                      onClick={handleVisits}
                    >
                      {visits.length} Visit{renderText(visits.length)}
                    </span>
                  )}
                </VisitButton>
                <div className='comment-container'>
                  <div className='center'>
                    <span className='center' onClick={toggleCommentsModal}>
                      <AiOutlineComment size={26} />
                    </span>
                    {!hasComments ? (
                      <span className='action-label'> No Comments</span>
                    ) : (
                      <span
                        className='comments-btn action-label'
                        onClick={toggleCommentsModal}
                      >
                        {comments.length} Comment{renderText(comments.length)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Modal open={openLikesModal} onClose={toggleLikesModal} center>
              <LikesModal likes={likes} />
            </Modal>
            <Modal open={openVisitsModal} onClose={toggleVisitsModal} center>
              <VisitsModal visits={visits} />
            </Modal>
            <Modal
              open={openCommentsModal}
              onClose={toggleCommentsModal}
              center
            >
              <CommentsModal foodyId={_id} comments={comments} />
            </Modal>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default MapFoody;

const renderText = (num) => {
  return num === 1 ? '' : 's';
};

const renderDistanceText = (notSetFoodyLocation, distance) => {
  let text = '';
  if (notSetFoodyLocation) {
    text = 'Set foody location';
  } else {
    text = `${distance} Km`;
  }
  return text;
};
