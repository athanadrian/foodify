import { AiOutlineComment } from 'react-icons/ai';
import { BsBookmarkPlusFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { FiUsers, FiUserPlus } from 'react-icons/fi';
import { SiJusteat } from 'react-icons/si';

const profileInfo = ({
  totalCreations,
  totalComments,
  totalLikes,
  totalVisits,
  totalFollowers,
  totalFollowing,
}) => {
  return [
    {
      id: 1,
      icon: <SiJusteat className='icon' />,
      label: 'creations',
      value: totalCreations,
      color: 'green',
    },
    {
      id: 2,
      icon: <FiUsers className='icon' />,
      label: 'followers',
      value: totalFollowers,
      color: 'pink',
    },
    {
      id: 3,
      icon: <FiUserPlus className='icon' />,
      label: 'following',
      value: totalFollowing,
      color: 'purple',
    },
    {
      id: 4,
      icon: <FaHeart className='icon' />,
      label: 'likes',
      value: totalLikes,
      color: 'red',
    },
    {
      id: 5,
      icon: <BsBookmarkPlusFill className='icon' />,
      label: 'visits',
      value: totalVisits,
      color: 'blue',
    },
    {
      id: 6,
      icon: <AiOutlineComment className='icon' />,
      label: 'comments',
      value: totalComments,
      color: 'grey',
    },
  ];
};

export default profileInfo;
