import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useFoodyContext } from 'context/contexts/foodyContext';
import Wrapper from 'wrappers/PaginationContainer';

const PaginationContainer = () => {
  const { numOfPages, changePage, page } = useFoodyContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);
  const prevPage = () => {
    if (page === 1) return;
    const prev = page - 1;
    changePage(prev);
  };
  const nextPage = () => {
    let next = page + 1;
    if (next > numOfPages) return;
    changePage(next);
  };
  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type='button'
            className={`${pageNumber === page ? 'pageBtn active' : 'pageBtn'}`}
            onClick={() => changePage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PaginationContainer;
