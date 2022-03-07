import styled from 'styled-components';

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .form {
    border-top: 5px solid var(--primary-500);
    max-width: 400px;
  }
  h3 {
    text-align: center;
  }
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    margin-top: 1rem;
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
  .forgot-container {
    text-align: right;
  }

  .forgot-btn {
    background: transparent;
    border: transparent;
    color: var(--red-dark);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }

  .username {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .form-row {
      width: 100%;
    }
    svg {
      margin-top: 1rem;
      margin-left: 1rem;
    }
  }
`;

export default Wrapper;
