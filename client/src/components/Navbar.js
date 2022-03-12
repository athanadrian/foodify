import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaAlignLeft,
  FaUserCircle,
  FaCaretDown,
  FaSignOutAlt,
} from 'react-icons/fa';
import Wrapper from 'wrappers/Navbar';
import { Logo } from '.';
import { useAppContext } from 'context/contexts/appContext';
import { useFoodyContext } from 'context/contexts/foodyContext';

const Navbar = ({ publicView }) => {
  const { user, logoutUser } = useAppContext();
  const { toggleSidebar } = useFoodyContext();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <div className='nav-center'>
        {!publicView && (
          <button type='button' className='toggle-btn' onClick={toggleSidebar}>
            <FaAlignLeft />
          </button>
        )}
        {!publicView ? (
          <div>
            <Logo />
            <h3 className='logo-text'>dashboard</h3>
          </div>
        ) : (
          <div className='logo-foodify'>
            <Logo publicView />
            <h3 className='text-foodify'>foodify</h3>
          </div>
        )}
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div
            className={`${showLogout ? 'dropdown show-dropdown' : 'dropdown'} `}
          >
            {publicView && (
              <Link to={`/profile/${user?.username}`} className='dropdown-btn'>
                <FaSignOutAlt className='logout-icon' />
                Profile
              </Link>
            )}
            <button type='button' className='dropdown-btn' onClick={logoutUser}>
              <FaSignOutAlt className='logout-icon' />
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
