import { useFoodyContext } from 'context/contexts/foodyContext';
import { FaTimes } from 'react-icons/fa';
import Wrapper from 'wrappers/SmallSidebar';
import NavLinks from './NavLinks';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useFoodyContext();
  return (
    <Wrapper>
      <div
        className={`${
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }`}
      >
        <div className='content'>
          <button className='close-btn' type='button' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
