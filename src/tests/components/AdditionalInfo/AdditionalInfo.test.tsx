import { render, screen, fireEvent } from '@testing-library/react';
import AdditionalInfo from '../../../components/AdditionalInfo/AdditionalInfo';
import { RenderRouteWithOutletContext } from './RenderRouteWithOutletContext';

const mockSetSearchParams = vi.fn();

const renderComponent = (charId: string) =>
  render(
    <RenderRouteWithOutletContext
      context={{
        frontPage: 1,
        charId,
        setSearchParams: mockSetSearchParams,
      }}
    >
      <AdditionalInfo />
    </RenderRouteWithOutletContext>,
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
    expect(mockSetSearchParams).toHaveBeenCalledWith('page=1');
  });
});
