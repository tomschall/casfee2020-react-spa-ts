import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the app component', () => {
  const { container } = render(<App />);
  expect(container).toMatchInlineSnapshot(`
  <div>
    <div
      class="MuiBox-root MuiBox-root-1"
      style="height: 100vh; background-color: rgb(12, 16, 59);"
    >
      <div
        class="MuiBox-root MuiBox-root-3"
      >
        <div
          class="MuiCircularProgress-root MuiCircularProgress-colorPrimary MuiCircularProgress-indeterminate"
          role="progressbar"
          style="width: 40px; height: 40px;"
        >
          <svg
            class="MuiCircularProgress-svg"
            viewBox="22 22 44 44"
          >
            <circle
              class="MuiCircularProgress-circle MuiCircularProgress-circleIndeterminate"
              cx="44"
              cy="44"
              fill="none"
              r="20.2"
              stroke-width="3.6"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
  `);
});
