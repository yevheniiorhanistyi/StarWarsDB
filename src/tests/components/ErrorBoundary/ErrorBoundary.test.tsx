import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../../components/ErrorBoundary/ErrorBoundary';

const ComponentThatThrowsError: React.FC = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child component</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Child component')).toBeInTheDocument();
  });

  it('renders ErrorMessage when there is an error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
    render(
      <ErrorBoundary>
        <ComponentThatThrowsError />
      </ErrorBoundary>,
    );

    await vi.waitFor(() => {
      expect(screen.getByText('Something went wrong...')).toBeVisible();
    });
  });
});
