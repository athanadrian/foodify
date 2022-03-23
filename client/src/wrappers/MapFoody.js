import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  .map-container {
    width: 350px;
    @media (max-width: 500px) {
      width: 100%;
      height: 100%;
    }
  }
  header {
    padding: 0.8rem 1.2rem;
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
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
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
  .interested,
  .average {
    background: #e0e8f9;
    color: #647acb;
  }
  .unpublished,
  .expensive,
  .not-interested {
    color: #d66a6a;
    background: #ffeeee;
  }
  .cheap,
  .published {
    color: var(--grey-600);
    background: var(--primary-300);
  }

  .google-link {
    color: var(--primary-800);
    margin-bottom: 1rem;
    display: block;
    ::after {
      content: 'Google Maps';
      position: relative;
      left: -7px;
    }
  }
  .google-link:hover {
    color: var(--primary-500);
    text-decoration: underline;
  }
  .google-icon {
    position: relative;
    left: -10px;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .header-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 500px) {
      gap: 0.9rem;
    }
  }

  .location {
    cursor: pointer;
    svg {
      color: ${(props) => props.iconColor};
      font-size: 1.8rem;
    }
  }

  .actions-container {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 420px) {
      flex-direction: column;
      align-items: flex-start;

      .detail-btn {
        margin-bottom: 1rem;
      }
    }
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 420px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 120px;
    height: 30px;
  }

  .cost {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
    margin-top: 0.5rem;
    margin-left: auto;
  }
  .remarks-container {
    border-radius: var(--borderRadius);
    background-color: var(--grey-50);
    margin-top: 0.5rem;
  }
  .remarks-text {
    padding: 0.5rem 1rem;
    letter-spacing: var(--letterSpacing);
  }

  footer {
    margin-top: 1.5rem;
  }
  .detail-btn,
  .edit-btn,
  .delete-btn,
  .publish-btn,
  .unpublish-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .detail-btn {
    color: var(--blue-dark);
    background: var(--blue-light);
    margin-right: 0.5rem;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
    margin: 0 0.5rem;
    @media (max-width: 420px) {
      margin: 0rem;
    }
  }
  .publish-btn {
    color: var(--grey-900);
    background: var(--grey-200);
  }
  .unpublish-btn {
    color: var(--yellow-dark);
    background: #fcefc7;
  }

  .like-container {
    svg {
      cursor: pointer;
      margin-right: 0.5rem;
      color: var(--grey-400);
    }
  }

  .social-btn-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 500px) {
      flex-direction: column;
      align-items: start;
      gap: 1rem;
    }
  }

  .map-social {
    margin-top: 2rem;
  }

  .liked {
    span {
      letter-spacing: var(--letterSpacing);
    }
    svg {
      color: var(--red-dark);
    }
  }

  .visit-container {
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

  .comment-container {
    svg {
      cursor: pointer;
      margin-right: 0.5rem;
      color: var(--grey-400);
    }
  }

  .likes-btn {
    color: var(--red-dark);
    cursor: pointer;
  }
  .likes-btn:hover {
    color: var(--red-light);
    text-decoration: underline;
  }

  .visits-btn {
    color: var(--blue-dark);
    cursor: pointer;
  }
  .visits-btn:hover {
    color: var(--blue-light);
    text-decoration: underline;
  }

  .comments-btn {
    color: var(--grey-700);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
  .comments-btn:hover {
    color: var(--grey-200);
    text-decoration: underline;
  }

  .action-label {
    @media (max-width: 1050px) {
      display: none;
    }
    @media (max-width: 992px) {
      display: block;
    }
  }
`;

export default Wrapper;
