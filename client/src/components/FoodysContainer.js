import { useEffect, useState } from 'react';
import { useFoodyContext } from 'context/contexts/foodyContext';
import { Foody, Loading } from 'components';
import Wrapper from 'wrappers/FoodysContainer';
import PaginationContainer from './PaginationContainer';
import { UserLink } from './notifications/UserLink';
import { useAppContext } from 'context/contexts/appContext';
import { useLocation } from 'react-router-dom';
import { NoFoodys } from './NoData';

const FoodysContainer = ({
  all,
  my,
  profile,
  username,
  label,
  action,
  color,
  profileUserId,
}) => {
  const {
    foodys,
    totalFoodys,
    search,
    searchCuisine,
    searchType,
    searchMenu,
    searchCost,
    searchStatus,
    searchDistance,
    sort,
    numOfPages,
    page,
    isFoodyLoading,
    getAllFoodys,
    getMyFoodys,
    getProfileFoodys,
    isMyFoodys,
    handleChange,
  } = useFoodyContext();
  const { user } = useAppContext();
  const { state } = useLocation();

  const isOwnAccount = profileUserId === user?._id;
  const [filterFoodys, setFilterFoodys] = useState(foodys);
  useEffect(() => {
    if (state?.category && state?.enumQuery)
      handleChange({
        name: `search${state?.category}`,
        value: state?.enumQuery,
      });

    // eslint-disable-next-line
  }, [state?.enumQuery, state?.category]);

  useEffect(() => {
    if (all) getAllFoodys();
    if (my) getMyFoodys();
    if (profile) getProfileFoodys({ username, label });

    // eslint-disable-next-line
  }, [
    all,
    my,
    profile,
    page,
    search,
    searchCuisine,
    searchType,
    searchMenu,
    searchCost,
    searchStatus,
    sort,
    state?.enumQuery,
    state?.category,
  ]);

  const filterFoodysByDistance = () => {
    let tempFoodys = [...foodys];
    tempFoodys = tempFoodys.filter(
      (foody) => foody.distanceFromCurrentLocation <= searchDistance
    );
    return tempFoodys;
  };

  useEffect(() => {
    if (searchDistance === 0) {
      setFilterFoodys(foodys);
    } else {
      setFilterFoodys(filterFoodysByDistance());
    }
    // eslint-disable-next-line
  }, [searchDistance, foodys]);

  useEffect(() => {
    setFilterFoodys(foodys);
  }, [foodys]);

  if (isFoodyLoading) return <Loading center max />;

  if (totalFoodys === 0)
    return (
      <NoFoodys
        all={all}
        my={my}
        profile={profile}
        color={color}
        isOwnAccount={isOwnAccount}
        action={action}
        username={username}
        totalFoodys={totalFoodys}
      />
    );

  return (
    <>
      <Wrapper color={color}>
        <h5>
          {profile && (
            <>
              <UserLink isOwnAccount={isOwnAccount} username={username} />{' '}
              <span className='action'>{action}</span>:{' '}
            </>
          )}
          {filterFoodys.length} foody{filterFoodys.length > 1 && 's'}{' '}
          {!profile && <>{!isMyFoodys ? 'found' : 'created'}</>}
        </h5>
        <div className='foodys'>
          {filterFoodys.map((foody) => (
            <Foody key={foody._id} {...foody} />
          ))}
        </div>
        {numOfPages > 1 && <PaginationContainer />}
      </Wrapper>
    </>
  );
};

export default FoodysContainer;
