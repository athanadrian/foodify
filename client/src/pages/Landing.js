import { Link } from 'react-router-dom';
import main from 'assets/images/main.svg';
import { Logo } from 'components';
import Wrapper from 'wrappers/LandingPage';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            food <span>touring</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa vel
            esse omnis praesentium placeat est consectetur, aliquam minus
            veniam, sapiente nam nobis cumque, eum temporibus dicta
            exercitationem! Nulla, natus atque!
          </p>
          <Link to='/register' className='btn btn-hero'>
            login/register
          </Link>
        </div>
        <img src={main} alt='tour food hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
