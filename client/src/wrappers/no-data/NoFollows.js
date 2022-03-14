import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  .no-follow {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .no-follow-container {
      border: 1px solid var(--grey-200);
      border-radius: var(--borderRadius);
      width: 100%;
      height: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 0;

      @media (min-width: 992px) {
        flex-direction: column;
        justify-content: center;
        .icon {
          margin-bottom: 1rem;
        }
      }
      @media (max-width: 500px) {
        flex-direction: column;
        justify-content: center;
        .icon {
          margin-bottom: 1rem;
        }
      }
    }
    h4 {
      font-size: 1.5rem;
      color: var(--grey-400);
      margin: 0;
    }
    .icon {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
      margin-right: 1rem;
      &-following {
        background: var(--purple-light);
        color: var(--purple-dark);
      }
      &-followers {
        background: var(--pink-light);
        color: var(--pink-dark);
      }
    }
    svg {
      font-size: 1.5rem;
    }
  }
`;
export default Wrapper;
