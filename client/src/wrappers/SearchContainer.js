import styled from 'styled-components';

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  .distance {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  .icon-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .clear-btn {
    margin-top: 0px;
  }

  .icon {
    svg {
      vertical-align: middle;
      color: var(--grey-900);
      font-size: 1.2rem;
    }
  }

  .distance-value {
    margin-left: 0.5rem;
    letter-spacing: var(--letterSpacing);
    color: var(--primary-500);
  }

  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (max-width: 768px) {
    .icon {
      display: none;
    }

    .icon-btn {
      margin-top: 1rem;
    }
  }
`;

export default Wrapper;
