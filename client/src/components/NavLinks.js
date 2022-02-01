import { NavLink } from 'react-router-dom';
import links from '../utils/links';

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className='nav-links'>
      {links.map(({ id, path, text, icon }) => (
        <NavLink
          key={id}
          onClick={toggleSidebar}
          to={path}
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          <span className='icon'>{icon}</span> {text}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
