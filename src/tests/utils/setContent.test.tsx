import { render, screen } from '@testing-library/react';
import { setContent } from '../../utils';

describe('setContent function', () => {
  it('should render Spinner when process is "loading"', () => {
    const { container } = render(setContent('loading', <div>Test Component</div>));
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should render the provided component when process is "confirmed"', () => {
    const testComponent = <div>Test Component</div>;
    const { container } = render(setContent('confirmed', testComponent));
    expect(container).toContainHTML('<div>Test Component</div>');
  });

  it('should render ErrorMessage when process is "error"', () => {
    const { container } = render(setContent('error', <div>Test Component</div>));
    expect(container.querySelector('div')).toBeNull();
    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
  });

  it('should throw an error for unexpected process state', () => {
    expect(() => render(setContent('unknown', <div>Test Component</div>))).toThrow('Unexpected process state');
  });
});
