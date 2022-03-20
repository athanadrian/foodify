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
            foody <span>touring</span> app
          </h1>
          <p>
            At the end of November my wife with her business partners and I
            visited the restaurant "<span className='important'>title...</span>"
            to have our "<span className='important'>dinner...</span>". It was
            located at the "<span className='important'>village...</span>". It
            is built in the style of a huntsman's hut. This restaurant was
            chosen for its unique "<span className='important'>cuisine...</span>
            " that can satisfy the guests and for its quiet setting where we
            could have a conversation.
          </p>
          <p>
            At first, the "<span className='important'>menu...</span>" itself
            surprised our guests – it looked like a newspaper and no one guessed
            to look at it. Several newspapers were lying at our tables not
            catching our attention.
          </p>
          <p>
            The uniqueness of the restaurant lies in that you end up having an
            excellent "<span className='important'>dinner...</span>" without
            having to spend a large amount of money cause the "
            <span className='important'>cost...</span>" is "
            <span className='important'>average...</span>"
          </p>
          <p>
            Use <span className='important'>Foodify</span> as your journal to
            keep track of the restaurants you have{' '}
            <span className='important'>visited</span> -{' '}
            <span className='important'> liked </span>-{' '}
            <span className='important'>commented</span>! Keep them private or "
            <span className='important'>publish...</span>" and share them with
            other users to help them enjoy their "
            <span className='important'>breakfast...</span>,{' '}
            <span className='important'>brunch...</span>,{' '}
            <span className='important'> lunch...</span>,{' '}
            <span className='important'>dinner...</span>,{' '}
            <span className='important'>drink...</span>, as you did. You just
            have to...
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
