import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotFound from '../../../components/shared/NotFound';

test('renders the NotFound component', () => {
  const { container, getByText } = render(<NotFound />);
  expect(getByText('Ups! Page not found!')).toBeInTheDocument();
});
