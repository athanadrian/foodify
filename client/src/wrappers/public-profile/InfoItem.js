import styled from 'styled-components';

const Wrapper = styled.section`
  .item {
    border-top: 1px solid ${(props) => props.color};
    border-radius: var(--borderRadius);
    padding: 1rem 2rem;
    background: var(--white);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 3rem;
    align-items: center;
    line-height: 1.75 !important;

    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    h3 {
      color: ${(props) => props.color};
      letter-spacing: 0;
      text-transform: capitalize;
      line-height: 1.25;
      font-size: 1.75rem;
      margin-bottom: 0;
      font-weight: 700;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
    }

    .pink {
      background: #ffe0f0;
      color: #da4a91;
    }
    .green {
      background: var(--primary-100);
      color: var(--primary-500);
    }
    .purple {
      background: #e6e6ff;
      color: #5d55fa;
    }
    .yellow {
      background: #fffbea;
      color: #f0b429;
    }
    .blue {
      background: var(--blue-light);
      color: var(--blue-dark);
    }
    .red {
      background: var(--red-light);
      color: var(--red-dark);
    }
    .grey {
      background: var(--grey-100);
      color: var(--grey-700);
    }
  }
  @media (max-width: 540px) {
    .item {
      column-gap: 2rem;
    }
  }
`;
export default Wrapper;
