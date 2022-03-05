import {
  FaAlignLeft,
  FaUserCircle,
  FaCaretDown,
  FaSignOutAlt,
} from 'react-icons/fa';
import Wrapper from '../wrappers/Navbar';
import { Logo } from '.';
import { useState } from 'react';
import { useAppContext } from 'context/appContext';

const Navbar = () => {
  const { toggleSidebar, user, logoutUser } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
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
