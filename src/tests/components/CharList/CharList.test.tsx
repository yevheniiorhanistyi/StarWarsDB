import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import CharList from '../../../components/CharList/CharList';
import { charList } from '../../../mocks/data';
import { setupStore } from '../../../redux/store';
import { ICharData } from '../../../types/types';
import * as utils from '../../../utils';

const renderComponent = (items: ICharData[]) =>
  render(
    <Provider store={setupStore()}>
      <MemoryRouter initialEntries={['/?page=1']}>
        <CharList items={items} limit={10} />
      </MemoryRouter>
    </Provider>,
  );

describe('CharList', () => {
  it('return the corresponding message if the data is missing', () => {
    renderComponent([]);

    const noResultsText = screen.getByText('No results found in this galaxy...');
    const noResultsImage = screen.getByAltText('Sormtroopers');
    expect(noResultsText).toBeInTheDocument();
    expect(noResultsImage).toBeInTheDocument();
  });

  it('return the list of items', async () => {
    renderComponent(charList);

    const itemsList = await screen.getByRole('list', { name: '' });
    expect(itemsList).toBeInTheDocument();
  });

  it('calls openInfo when a card is clicked', () => {
    const getNumberFromStringSpy = vi.spyOn(utils, 'getNumberFromString');
    renderComponent(charList);
    const firstCardButton = screen.getByTestId(charList[0].name);

    fireEvent.click(firstCardButton);
    expect(getNumberFromStringSpy).toHaveBeenCalledWith(charList[0].url);
  });
});
