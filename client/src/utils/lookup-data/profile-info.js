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
      hexColor: '#2cb1bc',
      action: 'created',
    },
    {
      id: 2,
      icon: <FiUsers className='icon' />,
      label: 'followers',
      value: totalFollowers,
      color: 'pink',
      hexColor: '#da4a91',
      action: 'followed',
    },
    {
      id: 3,
      icon: <FiUserPlus className='icon' />,
      label: 'following',
      value: totalFollowing,
      color: 'purple',
      hexColor: '#5d55fa',
      action: 'following',
    },
    {
      id: 4,
      icon: <FaHeart className='icon' />,
      label: 'likes',
      value: totalLikes,
      color: 'red',
      hexColor: '#842029',
      action: 'liked',
    },
    {
      id: 5,
      icon: <BsBookmarkPlusFill className='icon' />,
      label: 'visits',
      value: totalVisits,
      color: 'blue',
      hexColor: '#0369a1',
      action: 'visited',
    },
    {
      id: 6,
      icon: <AiOutlineComment className='icon' />,
      label: 'comments',
      value: totalComments,
      color: 'grey',
      hexColor: '#334e68',
      action: 'commented',
    },
  ];
};

export default profileInfo;
