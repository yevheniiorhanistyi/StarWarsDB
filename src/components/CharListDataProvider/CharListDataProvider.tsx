import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { ICharData } from '../../types/types';

interface ICharListDataProvider {
  children: ReactNode;
}

export const CharListDataContext = createContext<{
  charListData: ICharData[];
  totalCount: number;
  setCharListData: (data: ICharData[]) => void;
  setTotalCount: (count: number) => void;
}>({
  charListData: [],
  totalCount: 0,
  setCharListData: () => {},
  setTotalCount: () => {},
});

export const CharListDataProvider = ({ children }: ICharListDataProvider) => {
  const [charListData, setCharListData] = useState<ICharData[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const contextValue = useMemo(
    () => ({
      charListData,
      totalCount,
      setCharListData,
      setTotalCount,
    }),
    [charListData, totalCount],
  );

  return <CharListDataContext.Provider value={contextValue}>{children}</CharListDataContext.Provider>;
};

export const useCharListData = () => {
  const context = useContext(CharListDataContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
