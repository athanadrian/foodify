import styled from 'styled-components';

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;

  &::after {
    content: 'Creator';
    position: absolute;
    top: 13px;
    left: 400px;
    transform: translateY(-100%);
    background: var(--white);
    color: var(--grey-500);
    text-transform: capitalize;
    font-weight: bold;
    padding: 0.5rem 0.3rem 0 0.3rem;
    letter-spacing: var(--letterSpacing);
    font-size: 1rem;
    @media (max-width: 1200px) {
      left: 200px;
    }
    @media (max-width: 600px) {
      left: 300px;
    }
    @media (max-width: 440px) {
      left: 200px;
    }
  }
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    h5 {
      letter-spacing: 0;
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
