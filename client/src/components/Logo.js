import { Link } from 'react-router-dom';
import logo from 'assets/images/logo_100.svg';
import logoImage from 'assets/images/logo-image.svg';
const Logo = ({ publicView }) => {
  return (
    <>
      {!publicView ? (
        <Link to='/'>
          <img src={logo} alt='Foodify' className='logo' />
        </Link>
      ) : (
        <Link to='/'>
          <img src={logoImage} alt='Foodify' className='logo-image' />
        </Link>
      )}
    </>
  );
};

export default Logo;
