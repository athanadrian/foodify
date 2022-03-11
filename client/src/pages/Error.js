import Wrapper from 'wrappers/ErrorPage';
import notFound from 'assets/images/not-found.svg';
import { Link } from 'react-router-dom';
const Error = () => {
  return (
    <Wrapper className='full-page'>
      <img src={notFound} alt='Not Found' />
      <h3>Ohh! page not found</h3>
      <p>We can't seem to find the page you're looking for</p>
      <Link to='/'>back home</Link>
    </Wrapper>
  );
};

export default Error;
