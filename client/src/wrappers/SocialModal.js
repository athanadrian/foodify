import styled from 'styled-components';

const Wrapper = styled.section`
  .socials-container {
    width: 80vw;
    max-width: 100%;
    border-radius: var(--borderRadius);
  }

  .socials-container-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.1rem;
    background-color: var(--grey-50);
    border: 1px solid var(--grey-100);
    border-radius: var(--borderRadius);
  }

  .social-container {
    padding: 1rem 1rem;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }

  .profile-icon {
    width: 45px;
    height: 45px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 1rem;
    align-self: center;
  }
  .profile-info {
    display: flex;
    align-items: end;
    justify-content: space-between;
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
    .social-text {
      color: var(--grey-600);
    }
    .social-date {
      color: var(--red-dark);
    }
  }

  @media (max-width: 578px) {
    .social-container-center {
      .profile-info {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
`;

export default Wrapper;
