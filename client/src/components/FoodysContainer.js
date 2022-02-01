import { useEffect } from 'react';
import { Foody, Loading } from '../components';
import { useAppContext } from '../context/appContext';
import Wrapper from '../wrappers/FoodysContainer';

const FoodysContainer = ({ all }) => {
  const {
    foodys,
    totalFoodys,
    //numOfPages,
    isLoading,
    getMyFoodys,
  } = useAppContext();

  console.log(foodys, totalFoodys);

  useEffect(() => {
    getMyFoodys();
    // eslint-disable-next-line
  }, []);

  if (isLoading) return <Loading center />;

  if (totalFoodys === 0)
    return (
      <Wrapper>
        <h2> No foodys {all ? 'to display' : 'created yet'}...</h2>
      </Wrapper>
    );

  return (
    <Wrapper>
      <h5>
        {totalFoodys} foody{foodys.length > 1 && 's'}{' '}
        {all ? 'found' : 'created'}
      </h5>
      <div className='foodys'>
        {foodys.map((foody) => (
          <Foody key={foody._id} {...foody} />
        ))}
      </div>
      {/* {numOfPages > 1 && <PageBtnContainer />} */}
    </Wrapper>
  );
};

export default FoodysContainer;
