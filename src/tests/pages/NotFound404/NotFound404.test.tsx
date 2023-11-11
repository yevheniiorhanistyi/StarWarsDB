import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound404 from '../../../pages/NotFound404/NotFound404';

describe('NotFound404 component', () => {
  it('renders the component correctly', () => {
    render(
      <MemoryRouter>
        <NotFound404 />
      </MemoryRouter>,
    );

    const imgElement = screen.getByAltText('Nothing not found');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.getAttribute('src')).toBe('/e404.jpeg');

    const headingElement = screen.getByText(/Great shot kid. That was one in a million./i);
    expect(headingElement).toBeInTheDocument();

    const linkElement = screen.getByRole('link', { name: /Let's get you home/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe('/');
  });
});
