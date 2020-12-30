import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotFound from '../../../components/shared/NotFound';

test('renders the app component', () => {
  const { container, getByText } = render(<NotFound />);
  expect(getByText('Upppsss ....! Something went wrong!')).toBeInTheDocument();
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="MuiBox-root MuiBox-root-3 makeStyles-root-1"
    >
      <h2>
        Upppsss ....! Something went wrong!
      </h2>
    </div>
  `);
});
