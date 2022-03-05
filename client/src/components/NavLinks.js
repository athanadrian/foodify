import { useAppContext } from 'context/appContext';
import { NavLink } from 'react-router-dom';
import { links } from '../utils/lookup-data';

const NavLinks = ({ toggleSidebar }) => {
  const {
    user: { unreadNotification },
  } = useAppContext();

  return (
    <div className='nav-links'>
      {links(unreadNotification).map(({ id, path, text, icon, className }) => (
        <NavLink
          key={id}
          onClick={toggleSidebar}
          to={path}
          className={({ isActive }) => renderLinkClass(isActive, className)}
        >
          <span className='icon'>{icon}</span> {text}
        </NavLink>
      ))}
    </div>
  );
};

const renderLinkClass = (isActive, className) => {
  return isActive ? `nav-link active ${className}` : `nav-link ${className}`;
};

export default NavLinks;
