import styled from 'styled-components';

const Wrapper = styled.section`
  .info-window-wrapper {
    width: 300px;
    height: 150px;
    box-shadow: var(--shadow-2);
    background: #fff;
    color: var(--grey-500);
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0.5rem;
    position: relative;
    z-index: 10;
  }
  .info-window-image {
    width: 100px;
    height: 100px;
    border-radius: 10px 0 0 10px;
    align-self: center;
    padding-left: 0.5rem;
  }
  .info-window-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    letter-spacing: var(--letterSpacing);
    padding: 0 2rem;

    p {
      margin-bottom: 0.5rem;
      margin-top: 0.5rem;
      color: var(--grey-900);
    }
    span {
      font-size: var(--small-text);
      text-transform: capitalize;
      font-weight: 500;
    }
  }
  h4 {
    margin-bottom: 0rem;
    color: var(--grey-900);
    text-decoration: underline;
  }
  .coordinate-container {
    text-align: left;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }

  .reset-btn {
    background: var(--yellow-light);
    color: var(--yellow-dark);
    margin-top: 0.5rem;
    height: 30px;
  }
  .reset-btn:hover {
    background: var(--yellow-dark);
    color: var(--yellow-light);
  }
`;
export default Wrapper;
