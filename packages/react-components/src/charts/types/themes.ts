export type Theme = {
  background: {
    from: string;
    to: string;
  };
  headings: {
    title: string;
    subtitle: string;
  };
  axis: {
    label: string;
    tickLabel: string;
    tick: string;
    line: string;
  };
  grid: {
    line: string;
  };
}

export type ThemeVariants = 'light' | 'dark';

export type Themes = Record<ThemeVariants, Theme>

