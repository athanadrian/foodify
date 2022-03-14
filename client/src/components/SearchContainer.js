import Wrapper from 'wrappers/SearchContainer';
import {
  FormInput,
  FormSelect,
  FormEnumSelect,
  //  FormRangeInput
} from '.';
import { useFoodyContext } from 'context/contexts/foodyContext';

const SearchContainer = () => {
  const {
    isFoodyLoading,
    search,
    searchCuisine,
    searchFoody,
    searchCost,
    searchStatus,
    //searchDistance,
    //min_distance,
    //max_distance,
    sort,
    statusOptions,
    costOptions,
    foodyOptions,
    cuisineOptions,
    sortOptions,
    handleChange,
    clearFilters,
    isMyFoodys,
  } = useFoodyContext();

  const handleSearch = (e) => {
    if (isFoodyLoading) return;
    const { name, value } = e.target;
    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    clearFilters();
  };

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          <FormInput
            name='search'
            type='text'
            value={search}
            handleChange={handleSearch}
            placeholder='village'
          />
          <FormEnumSelect
            name='searchCuisine'
            value={searchCuisine}
            labelText='cuisine'
            handleChange={handleSearch}
            list={cuisineOptions}
            allOption
          />
          <FormEnumSelect
            name='searchFoody'
            value={searchFoody}
            labelText='foody type'
            handleChange={handleSearch}
            list={foodyOptions}
            allOption
          />
          <FormEnumSelect
            name='searchCost'
            value={searchCost}
            labelText='cost'
            handleChange={handleSearch}
            list={costOptions}
            allOption
          />
          <FormSelect
            name='sort'
            value={sort}
            labelText='sort by'
            handleChange={handleSearch}
            list={sortOptions}
          />
          {/* <FormRangeInput
            name='distance'
            value={searchDistance}
            handleChange={handleChange}
            min={min_distance}
            max={max_distance}
          /> */}
          {isMyFoodys && (
            <FormEnumSelect
              name='searchStatus'
              value={searchStatus}
              labelText='status'
              handleChange={handleSearch}
              list={statusOptions}
              allOption
            />
          )}
          <button
            className='btn btn-block btn-danger'
            disabled={isFoodyLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
