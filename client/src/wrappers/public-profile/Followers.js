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
    content: ' followers';
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
  .followers {
    overflow: scroll;
    height: 260px;
    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(45px, 1fr));
    gap: 1.25rem 1rem;
    padding: 1rem 2rem;
  }
  article {
    transition: var(--transition);
    padding: 0.15rem 0.5rem;
    border-radius: var(--borderRadius);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 1rem;

    .follow-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    img {
      height: 100%;
      width: 45px;
      border-radius: 50%;
      object-fit: cover;
    }
    h4 {
      color: var(--grey-700);
      margin-bottom: 0;
      font-size: 1rem;
      text-transform: none;
    }
    .email {
      a,
      span {
        color: var(--grey-500);
      }
    }
    .username {
      text-transform: none;
    }
    .full-name {
      text-transform: capitalize;
      margin-left: 0.5rem;
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .followers {
      padding: 0;
    }
    .full-name {
      display: none;
    }
    .email {
      display: none;
    }
  }
  @media (max-width: 560px) {
    .full-name,
    .email {
      display: none;
    }
  }
  @media (max-width: 420px) {
    .email {
      display: none;
    }
  }
`;
export default Wrapper;
