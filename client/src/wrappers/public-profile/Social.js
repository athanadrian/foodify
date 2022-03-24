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
    justify-content: space-around;
  }

  .underline {
    width: 100%;
    height: 0.05rem;
    background: var(--grey-200);
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
  .message {
    margin-top: 2rem;
    //justify-content: space-around;
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
  .messenger-icon {
    color: #006aff;
  }
  .whatsApp-icon {
    color: #25d366;
  }
  .viber-icon {
    color: #59267c;
  }
  .mobile-icon {
    width: 38px;
    height: 38px;
    color: #deac1af7;
    border: 2px solid #deac1af7;
    border-radius: 50%;
    padding: 0.4rem;
  }
  .mobile-icon:hover {
    border: 2px solid var(--primary-500);
    transform: translateY(-10%);
  }
`;
export default Wrapper;
