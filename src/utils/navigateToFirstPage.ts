import type { NavigateFunction } from 'react-router-dom';

export const navigateToFirstPage = (search: string, page: number, count: number, navigate: NavigateFunction) => {
  const totalPageCount: number = Math.ceil(count / 10);
  if (search !== '' && totalPageCount < page) {
    navigate('/people?page=1');
  }
};

export default navigateToFirstPage;
