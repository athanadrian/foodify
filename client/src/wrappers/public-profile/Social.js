import styled from 'styled-components';

const Wrapper = styled.article`
  margin-top: 2rem;
  background: var(--white);
  padding: 1.5rem 2rem;
  border-top-right-radius: var(--borderRadius);
  border-bottom-left-radius: var(--borderRadius);
  border-bottom-right-radius: var(--borderRadius);
  position: relative;
  &::before {
    content: 'social';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: var(--white);
    color: var(--grey-500);
    border-top-right-radius: var(--borderRadius);
    border-top-left-radius: var(--borderRadius);
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--letterSpacing);
    font-size: 1rem;
  }
  .hero-info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .underline {
    width: 100%;
    height: 0.05rem;
    background: var(--primary-500);
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 992px) {
      margin-bottom: 1rem;
    }
  }

  .social-icons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .social-icons .social-icon {
    font-size: 2.5rem;
    transition: var(--transition);
    margin-left: 0.5rem;
  }
  .social-icons .social-icon:hover {
    color: var(--primary-500);
    transform: translateY(-10%);
  }
  .facebook-icon {
    color: #3b5998;
  }
  .twitter-icon {
    color: #00acee;
  }
  .youtube-icon {
    color: #ff0200;
  }
  .instagram-icon {
    color: #fc5345;
  }
`;
export default Wrapper;
