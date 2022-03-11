import { useEffect } from 'react';
import { useFoodyContext } from 'context/contexts/foodyContext';
import { Foody, Loading } from 'components';
import Wrapper from 'wrappers/FoodysContainer';
import PaginationContainer from './PaginationContainer';

const FoodysContainer = ({ all }) => {
  const {
    foodys,
    totalFoodys,
    search,
    searchCuisine,
    searchFoody,
    searchCost,
    searchStatus,
    searchPreference,
    sort,
    numOfPages,
    page,
    isFoodyLoading,
    getAllFoodys,
    getMyFoodys,
    isMyFoodys,
  } = useFoodyContext();

  useEffect(() => {
    all ? getAllFoodys() : getMyFoodys();
    // eslint-disable-next-line
  }, [
    page,
    all,
    search,
    searchCuisine,
    searchFoody,
    searchCost,
    searchStatus,
    searchPreference,
    sort,
  ]);
  if (isFoodyLoading) return <Loading center max />;

  if (totalFoodys === 0)
    return (
      <Wrapper>
        <h2> No foodys {all ? 'to display' : 'created yet'}...</h2>
      </Wrapper>
    );

  return (
    <>
      <Wrapper>
        <h5>
          {totalFoodys} foody{foodys.length > 1 && 's'}{' '}
          {!isMyFoodys ? 'found' : 'created'}
        </h5>
        <div className='foodys'>
          {foodys.map((foody) => (
            <Foody all={!isMyFoodys} key={foody._id} {...foody} />
          ))}
        </div>
        {numOfPages > 1 && <PaginationContainer />}
      </Wrapper>
    </>
  );
};

export default FoodysContainer;
