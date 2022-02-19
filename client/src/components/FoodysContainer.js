import { useEffect } from 'react';
import { Foody, Loading, Modal } from '../components';
import { useAppContext } from '../context/appContext';
import Wrapper from '../wrappers/FoodysContainer';
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
    isLoading,
    getAllFoodys,
    getMyFoodys,
    isMyFoodys,
    showModal,
    toggleModal,
  } = useAppContext();

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
  console.log('T', totalFoodys, 'P', page, 'NP', numOfPages);
  if (isLoading) return <Loading center />;

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
          {isMyFoodys ? 'found' : 'created'}
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
