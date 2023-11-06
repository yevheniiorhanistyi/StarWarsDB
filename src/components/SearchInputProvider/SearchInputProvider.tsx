import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { getFromLocalStorage } from '../../utils';

interface ISearchInputProvider {
  children: ReactNode;
}

const SearchInputContext = createContext<{
  inputValue: string;
  setInputValue: (value: string) => void;
}>({
  inputValue: getFromLocalStorage('searchValue') || '',
  setInputValue: () => {},
});

export const SearchInputProvider = ({ children }: ISearchInputProvider) => {
  const [inputValue, setInputValue] = useState(getFromLocalStorage('searchValue') || '');

  const contextValue = useMemo(
    () => ({
      inputValue,
      setInputValue,
    }),
    [inputValue],
  );

  return <SearchInputContext.Provider value={contextValue}>{children}</SearchInputContext.Provider>;
};

export const useSearchInput = () => {
  const context = useContext(SearchInputContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
