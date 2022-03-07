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
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 0rem;
  }

  .username {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .form-row {
      width: 100%;
    }
    svg {
      margin-top: 2rem;
      margin-left: 1rem;
    }
  }

  .text-area {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }

  .save-btn {
    margin-top: 1rem;
  }

  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }

  .map-btn {
    background: var(--yellow-light);
    color: var(--yellow-dark);
    margin-top: 0px;
  }
  .map-btn:hover {
    background: var(--yellow-dark);
    color: var(--yellow-light);
  }
  .current-btn {
    background: var(--blue-light);
    color: var(--blue-dark);
    margin-top: 0px;
  }
  .current-btn:hover {
    background: var(--blue-dark);
    color: var(--blue-light);
  }

  .icon-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .icon {
    svg {
      vertical-align: middle;
      color: var(--grey-900);
      font-size: 1.2rem;
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
