import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--white);
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--grey-100);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
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
    h4 {
      margin-bottom: 0.1rem;
      color: var(--blue-dark);
    }
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
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

  .comments- &container {
  }
  &content {
  }

  &input {
  }

  @media (max-width: 992px) {
    border-top: 1px solid var(--grey-100);
  }
`;

export default Wrapper;
