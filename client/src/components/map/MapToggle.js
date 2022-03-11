import { useFoodyContext } from 'context/contexts/foodyContext';
import Foody from 'assets/images/foody.svg';
import MyFoody from 'assets/images/my-foody.svg';
import Wrapper from 'wrappers/MapToggle';

const MapToggle = () => {
  const { getAllFoodys, getMyFoodys } = useFoodyContext();
  return (
    <Wrapper>
      <div className='btn-container'>
        <button
          title='All Foodys'
          className='btn-cover all-foodys'
          onClick={getAllFoodys}
        >
          <img src={Foody} alt='All Foodys' />
        </button>
        <button
          title='My Foodys'
          className='btn-cover my-foodys'
          onClick={getMyFoodys}
        >
          <img src={MyFoody} alt='My Foodys' />
        </button>
      </div>
    </Wrapper>
  );
};

export default MapToggle;
