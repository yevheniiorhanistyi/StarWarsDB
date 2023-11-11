import { render } from '@testing-library/react';
import App from '../App';

describe('App component rendering', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeDefined();
  });
});
