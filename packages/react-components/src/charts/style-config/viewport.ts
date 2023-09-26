import { ViewportStyleConfig } from '../types/viewport';

export const viewportStyleConfig: ViewportStyleConfig = {
  tiny: {
    maxWidth: 250,
    maxHeight: 120,
    numTicks: 3,
  },
  small: {
    maxWidth: 500,
    maxHeight: 250,
    numTicks: 5,
  },
  large: {
    numTicks: 10,
  },
};
