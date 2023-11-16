import { MemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Main from '../../../pages/Main/Main';
import { CharListDataContext } from '../../../components/CharListDataProvider/CharListDataProvider';
import { CharListData } from '../../components/CharList/CharListData';

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object;
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

const renderComponent = () =>
  render(
    <MemoryRouter>
      <CharListDataContext.Provider
        value={{
          charListData: CharListData,
          totalCount: 0,
          setCharListData: () => {},
          setTotalCount: () => {},
        }}
      >
        <Main />
      </CharListDataContext.Provider>
    </MemoryRouter>,
  );

describe('Main component', () => {
  it('renders Main component correctly', async () => {
    renderComponent();
    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(3);
  });
  it('show backdrop after click on list item', async () => {
    renderComponent();
    const button = await screen.findByTestId('Luke Skywalker');
    fireEvent.click(button);
    const backdrop = await screen.findByTestId('backdrop');
    expect(backdrop).toBeInTheDocument();
  });
});
