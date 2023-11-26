import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import AdditionalInfo from '../../../components/AdditionalInfo/AdditionalInfo';
import { setupStore } from '../../../redux/store';

const navigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object;
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

const renderComponent = (charId: string) =>
  render(
    <Provider store={setupStore()}>
      <MemoryRouter initialEntries={[`/?page=1&details=${charId}`]}>
        <AdditionalInfo />
      </MemoryRouter>
    </Provider>,
  );

describe('CharList', () => {
  it('renders AdditionalInfo component correctly', async () => {
    renderComponent('1');
    const name = await screen.findByText('Luke Skywalker');
    const image = await screen.getByAltText('Luke Skywalker');
    const height = await screen.findByText('Height: 172');
    expect(name).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(height).toBeInTheDocument();
  });

  it('does not render AdditionalInfo component when charId is not provided', () => {
    const { container } = renderComponent('');

    expect(container.firstChild).toBeNull();
  });

  it('close the information after click on the button', async () => {
    renderComponent('1');
    const button = await screen.findByText('Close');
    fireEvent.click(button);
    expect(navigate).toHaveBeenCalledWith(`/?page=1`);
  });
});
