import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchInput from '../../../components/SearchInput/SearchInput';
import { setupStore } from '../../../redux/store';

const mockHandleSubmit = vi.fn();

const renderComponent = (term = '') =>
  render(
    <Provider store={setupStore()}>
      <SearchInput handleSubmit={mockHandleSubmit} term={term} />
    </Provider>,
  );

describe('SearchInput', () => {
  it('renders without errors', () => {
    const { container } = renderComponent();
    expect(container).toBeInTheDocument();
  });
  it('component should access context properly', () => {
    renderComponent('test');
    expect(screen.getByPlaceholderText('Type to search')).toHaveValue('test');
  });

  it('calls onSearchChange when input value changes', async () => {
    const { getByPlaceholderText } = renderComponent();
    const inputElement = getByPlaceholderText('Type to search');
    const submitButton = screen.getByRole('button', { name: '' });

    fireEvent.change(inputElement, { target: { value: 'abc' } });
    fireEvent.submit(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledWith('abc');
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
