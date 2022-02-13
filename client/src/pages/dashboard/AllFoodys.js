import { FoodysContainer, SearchContainer } from '../../components';

const AllFoodies = () => {
  return (
    <div className='dashboard-page'>
      <SearchContainer all />
      <FoodysContainer all />
    </div>
  );
};

export default AllFoodies;
