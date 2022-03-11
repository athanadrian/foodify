import { FoodyDetail } from '.';
import Wrapper from 'wrappers/FoodyModal';
import FoodySocial from './FoodySocial';
const FoodyModal = () => {
  return (
    <Wrapper>
      <div className='container'>
        <div className='container-center'>
          <FoodyDetail />
          <FoodySocial />
        </div>
      </div>
    </Wrapper>
  );
};

export default FoodyModal;
