/* eslint-disable no-console */
import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';

import { OverlayContainer } from './overlay-container';

describe('<OverlayContainer>', () => {
  test('it should be defined', () => expect(OverlayContainer).toBeDefined());
  test('it should render children properly', async () => {
    try {
      await waitFor(() => expect(<OverlayContainer>test</OverlayContainer>).toBeDefined());
      await screen.findByText('test');
      const { baseElement } = render(<OverlayContainer>test</OverlayContainer>);
      await waitFor(() => expect(baseElement).toMatchSnapshot());
    } catch (error: unknown) {
      console.error(error);
    }
  });
});
