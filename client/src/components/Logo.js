import { Link } from 'react-router-dom';
import logo from '../assets/images/logo_100.svg';
const Logo = () => {
  return (
    <Link to='/'>
      <img src={logo} alt='Foodify' className='logo' />
    </Link>
  );
};

export default Logo;
