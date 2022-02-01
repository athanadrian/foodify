import Wrapper from '../wrappers/ErrorPage';
import notFound from '../assets/images/not-found.svg';
import {
  Link,
  //useNavigate
} from 'react-router-dom';
const Error = () => {
  //const navigate = useNavigate();
  return (
    <Wrapper className='full-page'>
      <img src={notFound} alt='Not Found' />
      <h3>Ohh! page not found</h3>
      <p>We can't seem to find the page you're looking for</p>
      {/* <button onClick={() => navigate(-1)}>GO BACK</button> */}
      <Link to='/'>back home</Link>
    </Wrapper>
  );
};

export default Error;
