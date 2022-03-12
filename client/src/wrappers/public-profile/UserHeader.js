import styled from 'styled-components';

const Wrapper = styled.article`
  header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1rem;

    .user-data-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .user-data {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
    }

    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
    h4 {
      color: var(--grey-700);
      margin-bottom: 0;
      font-size: 1rem;
      text-transform: none;
    }
    .email {
      color: var(--grey-500);
    }
    .username {
      text-transform: none;
    }
    .full-name {
      text-transform: capitalize;
      letter-spacing: var(--letterSpacing);
      font-weight: 700;
    }
    /* img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
    h4 {
      margin-bottom: 0.25rem;
    }
    p {
      margin-bottom: 0;
    }
    a {
      color: var(--blue-dark);
      text-transform: capitalize;
      letter-spacing: var(--letterSpacing);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        text-decoration: underline;
        color: var(--blue-light);
      }
    } */
  }
`;
export default Wrapper;
