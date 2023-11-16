import { render, fireEvent, waitFor } from '@testing-library/react';
import { CharListDataContext } from '../../../components/CharListDataProvider/CharListDataProvider';
import Pagination from '../../../components/Pagination/Pagination';

const mockOnPageChange = vi.fn();

const renderComponent = (currentPage: number, totalCount: number) =>
  render(
    <CharListDataContext.Provider
      value={{
        charListData: [],
        totalCount,
        setCharListData: () => {},
        setTotalCount: () => {},
      }}
    >
      <Pagination onPageChange={mockOnPageChange} currentPage={currentPage} />
    </CharListDataContext.Provider>,
  );

describe('Pagination', () => {
  it('renders without errors', () => {
    const { container } = renderComponent(1, 10);
    expect(container).toBeInTheDocument();
  });

  it('renders correct number of buttons', () => {
    const { getAllByRole } = renderComponent(1, 60);
    const buttons = getAllByRole('button');
    expect(buttons.length).toBe(8);
  });

  it('calls onPageChange when a button is clicked', () => {
    const { getByText } = renderComponent(1, 10);
    const button = getByText('1');
    fireEvent.click(button);
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('disables previous button on the first page', () => {
    const { getByText } = renderComponent(1, 10);
    const prevButton = getByText('<');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on the last page', () => {
    const { getByText } = renderComponent(1, 10);
    const nextButton = getByText('>');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange when a button next is clicked', async () => {
    const { getByText } = renderComponent(1, 80);
    const button = getByText('>');
    fireEvent.click(button);

    await waitFor(() => expect(mockOnPageChange).toHaveBeenCalledWith(1));
  });

  it('calls onPageChange when a button previous is clicked', async () => {
    const { getByText } = renderComponent(3, 80);
    const button = getByText('<');
    fireEvent.click(button);

    await waitFor(() => expect(mockOnPageChange).toHaveBeenCalledWith(1));
  });

  it('does not render buttons when paginationRange is empty', () => {
    const { queryByRole } = renderComponent(1, 0);
    const buttons = queryByRole('button');
    expect(buttons).toBeNull();
  });
});
