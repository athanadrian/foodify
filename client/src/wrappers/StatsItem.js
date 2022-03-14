import styled from 'styled-components';

const Wrapper = styled.article`
  padding: 2rem;
  background: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 1px solid ${(props) => props.color};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .stat-link {
    line-height: 1.75 !important;
  }
  .count {
    display: block;
    font-weight: 700;
    font-size: 50px;
    color: ${(props) => props.color};
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: 0.5rem;
    color: var(--grey-700);
  }
  .icon {
    width: 70px;
    height: 60px;
    background: ${(props) => props.bcg};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2rem;
      color: ${(props) => props.color};
    }
  }
  .cost-icon {
    width: 180px;
    height: 60px;
    background: ${(props) => props.bcg};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: ${(props) => props.color};
  }

  @media (min-width: 1120px) {
    .cost-icon {
      width: 130px;
      height: 60px;
      font-size: 1.5rem;
    }
  }
`;

export default Wrapper;
