import { render, fireEvent, screen } from '@testing-library/react';
import SearchInput from '../../../components/SearchInput/SearchInput';
import { SearchInputContext } from '../../../components/SearchInputProvider/SearchInputProvider';

const mockHandleSubmit = vi.fn();
const mockOnSearchChange = vi.fn();

const renderComponent = () =>
  render(
    <SearchInputContext.Provider value={{ inputValue: 'test', setInputValue: () => {} }}>
      <SearchInput handleSubmit={mockHandleSubmit} onSearchChange={mockOnSearchChange} />
    </SearchInputContext.Provider>,
  );

describe('SearchInput', () => {
  it('renders without errors', () => {
    const { container } = renderComponent();
    expect(container).toBeInTheDocument();
  });
  it('component should access context properly', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Type to search')).toHaveValue('test');
  });

  it('calls onSearchChange when input value changes', () => {
    const { getByPlaceholderText } = renderComponent();
    const inputElement = getByPlaceholderText('Type to search');

    fireEvent.change(inputElement, { target: { value: 'abc' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('abc');
  });

  it('calls handleSubmit when form is submitted', () => {
    const { getByPlaceholderText } = renderComponent();
    const inputElement = getByPlaceholderText('Type to search');
    const submitButton = screen.getByRole('button', { name: '' });

    fireEvent.change(inputElement, { target: { value: 'test' } });
    fireEvent.submit(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
