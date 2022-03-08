import styled from 'styled-components';

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .logo-image {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .logo-foodify {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 0.5;
  }
  .text-foodify {
    color: var(--primary-500);
    letter-spacing: 0.5rem;
    margin: 0;
    @media (max-width: 684px) {
      display: none;
    }
  }
  .logo-image {
    width: 100px;
  }

  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  background: var(--white);
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--primary-100);
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
    z-index: 1;
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.3rem;
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }

  .logout-icon {
    color: var(--red-dark);
  }
  .logo-text {
    display: none;
    margin: 0;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }

    .logo-text {
      display: block;
    }
  }
`;
export default Wrapper;
