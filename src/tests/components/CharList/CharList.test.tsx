import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { ICharData } from '../../../types/types';
import { CharListDataContext } from '../../../components/CharListDataProvider/CharListDataProvider';
import CharList from '../../../components/CharList/CharList';
import { CharListData } from './CharListData';

const mockOpenInfo = vi.fn();

const renderComponent = (charListData: ICharData[] | []) =>
  render(
    <CharListDataContext.Provider
      value={{
        charListData,
        totalCount: 0,
        setCharListData: () => {},
        setTotalCount: () => {},
      }}
    >
      <CharList perPage={5} openInfo={mockOpenInfo} />
    </CharListDataContext.Provider>,
  );

describe('CharList', () => {
  it('return the corresponding message if the data is missing', () => {
    renderComponent([]);

    const noResultsText = screen.getByText('No results found in this galaxy...');
    const noResultsImage = screen.getByAltText('Sormtroopers');
    expect(noResultsText).toBeInTheDocument();
    expect(noResultsImage).toBeInTheDocument();
  });

  it('return the list of items', () => {
    renderComponent(CharListData);

    const itemsList = screen.getByRole('list', { name: '' });
    expect(itemsList).toBeInTheDocument();
  });

  it('calls openInfo when a card is clicked', () => {
    renderComponent(CharListData);
    const firstCardButton = screen.getByTestId(CharListData[0].name);

    fireEvent.click(firstCardButton);
    expect(mockOpenInfo).toHaveBeenCalled();
  });
});
