import styled from 'styled-components';

const Wrapper = styled.section`
  .socials-container {
    width: 100%;
    max-width: 100%;
    border-radius: var(--borderRadius);
    @media (max-width: 572px) {
      width: 100%;
    }
    @media (min-width: 992px) {
      width: 100%;
    }
  }

  .socials-container-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.1rem;
    background-color: var(--grey-50);
    border-top: 1px solid var(--grey-100);
    border-bottom-left-radius: 0.19rem;
    border-bottom-right-radius: 0.19rem;
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
    background: var(--blue-dark);
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
    place-items: center;
    .info-container {
      display: flex;
      flex-direction: column;
    }

    svg {
      color: var(--red-dark);
    }

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
  .comment {
    color: var(--grey-700);

    &-text {
      margin-left: 1rem;
      font-size: var(--small-text);
      color: var(--grey-500);
    }
    &-date {
      font-size: var(--extra-small-text);
      color: var(--grey-300);
    }
    &-btn {
      margin-top: 1rem;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border: 1px solid var(--grey-400);
    }

    &-row {
      width: 100%;
      margin-top: 1rem;
    }
    &-input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 0;
    }
    &-form {
      padding: 0.5rem;
    }
    &-delete-btn {
      cursor: pointer;
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
