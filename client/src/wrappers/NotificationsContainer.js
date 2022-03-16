import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .notification-container {
    padding: 1rem 1rem;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }

  .profile-icon {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--blue-dark);
    border-radius: 50%;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 1rem;
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
      text-transform: none;
      font-size: 1rem;
      margin-bottom: 0rem;
      .foody {
        color: var(--primary-500);
        cursor: pointer;
        text-transform: capitalize;
      }
      .foody:hover {
        text-decoration: underline;
        color: var(--primary-400);
      }

      svg {
        margin-right: 0.25rem;
      }
      .like,
      .visit,
      .comment {
        font-weight: 700;
      }
      .like {
        color: var(--red-dark);
      }
      .visit {
        color: var(--blue-dark);
      }
      .comment {
        color: var(--grey-700);
      }
      .follow {
        color: var(--purple-dark);
      }
      .date {
        text-transform: none;
      }
    }

    p {
      margin: 0;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }

    .notification-text {
      font-size: 0.75rem;
      letter-spacing: var(--letterSpacing);
      color: var(--grey-400);
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

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }

    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
    .text-area textarea {
      height: 4rem;
    }
  }
  @media (max-width: 992px) {
    .icon {
      display: none;
    }

    .icon-btn {
      margin-top: 1rem;
    }
  }
`;

export default Wrapper;
