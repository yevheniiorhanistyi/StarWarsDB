import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../../../redux/store';
import Pagination from '../../../components/Pagination/Pagination';

const mockOnPageChange = vi.fn();
const mockOnChangeLimit = vi.fn();

const renderComponent = (currentPage: number, totalCount: number) =>
  render(
    <Provider store={setupStore()}>
      <Pagination
        totalCount={totalCount}
        limit={10}
        onPageChange={mockOnPageChange}
        currentPage={currentPage}
        onChangeLimit={mockOnChangeLimit}
      />
    </Provider>,
  );

describe('Pagination', () => {
  it('renders without errors', () => {
    const { container } = renderComponent(1, 10);
    expect(container).toBeInTheDocument();
  });

  it('renders correct number of buttons', () => {
    const { getAllByRole } = renderComponent(1, 60);
    const buttons = getAllByRole('button');
    expect(buttons.length).toBe(10);
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
  it('calls onChangeLimit when a limit button is clicked', () => {
    const { getByText } = renderComponent(1, 10);
    const limitButton = getByText('5');
    fireEvent.click(limitButton);
    expect(mockOnChangeLimit).toHaveBeenCalledWith(5);
  });
});
