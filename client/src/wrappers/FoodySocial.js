import styled from 'styled-components';

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    h5 {
      letter-spacing: 0;
      /* ::after {
        content: 'Creator';
        font-size: var(--small-text);
        color: var(--white);
        letter-spacing: var(--letterSpacing);
        width: 70px;
        padding: 0.015rem 0.2rem 0 0.2rem;
        background: var(--blue-dark);
        position: relative;
        top: -22px;
        left: -247px;
      } */
    }
  }

  .header-items {
  }

  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--blue-dark);
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      color: var(--blue-dark);
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
    span {
      font-size: var(--extra-small-text);
      color: var(--grey-300);
      margin-left: 1rem;
    }
  }
  .like-container {
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
      margin-right: 1rem;
      color: var(--grey-400);
    }
  }

  .liked {
    svg {
      color: var(--red-dark);
    }
  }

  .visit-container {
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
      cursor: pointer;
      margin-right: 0.5rem;
      color: var(--grey-400);
    }
  }

  .visited {
    span {
      letter-spacing: var(--letterSpacing);
    }
    svg {
      color: var(--blue-dark);
    }
  }

  @media (max-width: 992px) {
    border-top: 1px solid var(--grey-100);
  }
`;

export default Wrapper;
