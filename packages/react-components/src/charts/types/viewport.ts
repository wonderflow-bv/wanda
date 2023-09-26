export type ViewportSize = 'tiny' | 'small' | 'large';

export type ViewportSizeConfig = {
  maxWidth?: number;
  maxHeight?: number;
  numTicks: number;
}

export type ViewportStyleConfig = Record<ViewportSize, ViewportSizeConfig>
