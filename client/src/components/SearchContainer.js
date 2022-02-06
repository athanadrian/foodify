import { useAppContext } from '../context/appContext';
import Wrapper from '../wrappers/SearchContainer';
import { FormInput, FormSelect, FormEnumSelect } from '.';

const SearchContainer = ({ all }) => {
  const {
    isLoading,
    search,
    searchCuisine,
    searchFoody,
    searchCost,
    searchStatus,
    searchPreference,
    sort,
    statusOptions,
    costOptions,
    foodyOptions,
    preferenceOptions,
    cuisineOptions,
    sortOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
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
          <FormSelect
            name='searchCuisine'
            value={searchCuisine}
            labelText='cuisine'
            handleChange={handleSearch}
            list={cuisineOptions}
            all
          />
          <FormEnumSelect
            name='searchFoody'
            value={searchFoody}
            labelText='foody type'
            handleChange={handleSearch}
            list={foodyOptions}
            all
          />
          <FormEnumSelect
            name='searchCost'
            value={searchCost}
            labelText='cost'
            handleChange={handleSearch}
            list={costOptions}
            all
          />
          {!all && (
            <>
              <FormSelect
                name='searchStatus'
                value={searchStatus}
                labelText='status'
                handleChange={handleSearch}
                list={statusOptions}
                all
              />
              <FormSelect
                name='searchPreference'
                value={searchPreference}
                labelText='preference'
                handleChange={handleSearch}
                list={preferenceOptions}
                all
              />
            </>
          )}
          <FormSelect
            name='sort'
            value={sort}
            labelText='sort by'
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
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
