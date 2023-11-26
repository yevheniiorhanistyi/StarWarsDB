import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import { screen, fireEvent, render } from '@testing-library/react';
import { charList } from '../../../mocks/data';
import { setupStore } from '../../../redux/store';
import * as useGetAllCharacterQuery from '../../../services/swApi';
import Main from '../../../pages/Main/Main';

const spyAPIcall = vi.spyOn(useGetAllCharacterQuery, 'useGetAllCharacterQuery');
spyAPIcall.mockReturnValue({ data: { results: charList }, isFetching: false, refetch: vi.fn() });

const renderComponent = () =>
  render(
    <Provider store={setupStore()}>
      <MemoryRouter initialEntries={[`/?page=1`]}>
        <Main />
      </MemoryRouter>
    </Provider>,
  );

describe('Main component', () => {
  it('renders Main component correctly', async () => {
    renderComponent();
    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(3);
  });
  it('RTK Query was called correctly', async () => {
    renderComponent();
    expect(spyAPIcall).toHaveBeenCalled();
  });
  it('show backdrop after click on list item', async () => {
    renderComponent();
    const button = await screen.findByTestId('Luke Skywalker');
    fireEvent.click(button);
    const backdrop = await screen.findByTestId('backdrop');
    expect(backdrop).toBeInTheDocument();
  });
});
