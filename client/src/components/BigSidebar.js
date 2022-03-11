import { useFoodyContext } from 'context/contexts/foodyContext';
import { Logo } from '.';
import Wrapper from 'wrappers/BigSidebar';
import NavLinks from './NavLinks';

const BigSidebar = () => {
  const { showSidebar } = useFoodyContext();
  return (
    <Wrapper>
      <div
        className={`${
          showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
        }`}
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
