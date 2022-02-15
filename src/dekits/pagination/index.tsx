import { useCallback, useState } from "react";
import { Pagination } from "react-bootstrap";

export interface PageChangeData {
  page: number;
}

interface DePaginationProps {
  className?: string;

  /**
   * Default: 1.
   */
  currentPage?: number;

  /** Default: 20. */
  pageSize?: number;

  /**
   * Default: 0.
   */
  totalItems?: number;

  onPageChange?: (data: PageChangeData) => void;
}

export function DePagination(props: DePaginationProps) {
  const pageSize = props.pageSize || 20;
  const totalItems = props.totalItems || 0;
  const totalPage = Math.ceil(totalItems / pageSize);
  const [_currentPage, setCurrentPage] = useState(props.currentPage || 1)

  const handlePageChange = useCallback((page: number) => () => {
    setCurrentPage(page);
    props.onPageChange && props.onPageChange({ page });
  }, [props.onPageChange]);

  const pages = getPageList(_currentPage, totalPage);

  return (
    <div className={`de-pagination ${props.className ? props.className : 'de-mx-5'}`}>
      <div className='de-pagination-info'>Displaying 1/10 of 60</div>

      <Pagination size='sm'>
        {/* <Pagination.First />
        <Pagination.Prev /> */}
        <Pagination.Item
          onClick={handlePageChange(1)}
          disabled={_currentPage === 1}
        >
          <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M10.7144 9.8751L6.83437 5.9951L10.7144 2.1151C11.1044 1.7251 11.1044 1.0951 10.7144 0.705098C10.3244 0.315098 9.69438 0.315098 9.30438 0.705098L4.71437 5.2951C4.32438 5.6851 4.32438 6.3151 4.71437 6.7051L9.30438 11.2951C9.69438 11.6851 10.3244 11.6851 10.7144 11.2951C11.0944 10.9051 11.1044 10.2651 10.7144 9.8751Z' fill='currentColor' />
            <path fillRule='evenodd' clipRule='evenodd' d='M1.99219 0.412598C2.54447 0.412598 2.99219 0.860313 2.99219 1.4126L2.99219 10.5876C2.99219 11.1399 2.54447 11.5876 1.99219 11.5876C1.4399 11.5876 0.992188 11.1399 0.992188 10.5876L0.992188 1.4126C0.992188 0.860313 1.4399 0.412598 1.99219 0.412598Z' fill='currentColor' />
          </svg>
        </Pagination.Item>

        <Pagination.Item
          onClick={handlePageChange(_currentPage - 1)}
          disabled={_currentPage === 1}
        >
          <svg width='8' height='12' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M6.71047 9.87998L2.83047 5.99998L6.71047 2.11998C7.10047 1.72998 7.10047 1.09998 6.71047 0.70998C6.32047 0.31998 5.69047 0.31998 5.30047 0.70998L0.710469 5.29998C0.320469 5.68998 0.320469 6.31998 0.710469 6.70998L5.30047 11.3C5.69047 11.69 6.32047 11.69 6.71047 11.3C7.09047 10.91 7.10047 10.27 6.71047 9.87998Z' fill='currentColor' />
          </svg>
        </Pagination.Item>

        {pages.map((page, idx) => {
          if (page === null) {
            return <Pagination.Ellipsis key={idx} />
          }

          return <Pagination.Item key={idx} active={page === _currentPage} onClick={handlePageChange(page)}>{page}</Pagination.Item>
        })}

        <Pagination.Item
          onClick={handlePageChange(_currentPage + 1)}
          disabled={_currentPage === totalPage}
        >
          <svg width='8' height='12' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M1.28957 9.87998L5.16957 5.99998L1.28957 2.11998C0.89957 1.72998 0.89957 1.09998 1.28957 0.70998C1.67957 0.31998 2.30957 0.31998 2.69957 0.70998L7.28957 5.29998C7.67957 5.68998 7.67957 6.31998 7.28957 6.70998L2.69957 11.3C2.30957 11.69 1.67957 11.69 1.28957 11.3C0.90957 10.91 0.89957 10.27 1.28957 9.87998Z' fill='currentColor' />
          </svg>
        </Pagination.Item>

        <Pagination.Item
          onClick={handlePageChange(totalPage)}
          disabled={_currentPage === totalPage}
        >
          <svg width='10' height='12' viewBox='0 0 10 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M0.499531 9.8751L4.37953 5.9951L0.499531 2.1151C0.109531 1.7251 0.109531 1.0951 0.499531 0.705098C0.889531 0.315098 1.51953 0.315098 1.90953 0.705098L6.49953 5.2951C6.88953 5.6851 6.88953 6.3151 6.49953 6.7051L1.90953 11.2951C1.51953 11.6851 0.889531 11.6851 0.499531 11.2951C0.119531 10.9051 0.109531 10.2651 0.499531 9.8751Z' fill='currentColor' />
            <path fillRule='evenodd' clipRule='evenodd' d='M8.79199 0.412598C9.34428 0.412598 9.79199 0.860313 9.79199 1.4126L9.79199 10.5876C9.79199 11.1399 9.34428 11.5876 8.79199 11.5876C8.23971 11.5876 7.79199 11.1399 7.79199 10.5876L7.79199 1.4126C7.79199 0.860313 8.23971 0.412598 8.79199 0.412598Z' fill='currentColor' />
          </svg>
        </Pagination.Item>
        {/* <Pagination.Next />
        <Pagination.Last /> */}
      </Pagination>
    </div>
  )
}

function getPageList(currentPage, totalPage) {
  if (totalPage <= 5
    || (totalPage === 7 && currentPage === 4)
    || (totalPage === 6 && (currentPage === 3 || currentPage === 4))
  ) {
    const pages: number[] = [];

    for (let i = 1; i <= totalPage; i++) {
      pages.push(i)
    }

    return pages;
  }

  if (currentPage === 1) {
    return [1, 2, 3, null, totalPage];
  }

  if (currentPage === 2) {
    return [1, 2, 3, 4, null, totalPage];
  }

  if (currentPage === 3) {
    return [1, 2, 3, 4, 5, null, totalPage];
  }

  if (currentPage === 4) {
    return [1, 2, 3, 4, 5, 6, null, totalPage];
  }

  if (currentPage === totalPage) {
    return [1, null, totalPage - 2, totalPage - 1, totalPage];
  }

  if (currentPage === totalPage - 1) {
    return [1, null, totalPage - 3, totalPage - 2, totalPage - 1, totalPage]
  }

  if (totalPage > 6) {
    if (currentPage === totalPage - 2) {
      return [1, null, totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage]
    }

    if (currentPage === totalPage - 3) {
      return [1, null, totalPage - 5, totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage]
    }
  }

  return [1, null, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, null, totalPage];
}
