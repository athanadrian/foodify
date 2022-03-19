import Wrapper from 'wrappers/SearchContainer';
import {
  FormInput,
  FormSelect,
  FormEnumSelect,
  FormButton,
  FormRangeInput,
} from '.';
import { useFoodyContext } from 'context/contexts/foodyContext';
import { RiFilterOffFill } from 'react-icons/ri';

const SearchContainer = () => {
  const {
    isFoodyLoading,
    search,
    searchCuisine,
    searchMenu,
    searchCost,
    searchStatus,
    searchType,
    searchDistance,
    min_distance,
    max_distance,
    sort,
    statusOptions,
    costOptions,
    menuOptions,
    cuisineOptions,
    typeOptions,
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
            name='searchType'
            value={searchType}
            labelText='preferable'
            handleChange={handleSearch}
            list={typeOptions}
            allOption
          />
          <FormEnumSelect
            name='searchMenu'
            value={searchMenu}
            labelText='menu type'
            handleChange={handleSearch}
            list={menuOptions}
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
          <FormRangeInput
            name='searchDistance'
            labelText='Distance'
            value={searchDistance}
            handleChange={handleSearch}
            min={min_distance}
            max={max_distance}
          />
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
          <FormButton
            type='submit'
            Icon={RiFilterOffFill}
            btnText='clear filters'
            disabled={isFoodyLoading}
            className='btn-danger clear-btn'
            onClick={handleSubmit}
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
