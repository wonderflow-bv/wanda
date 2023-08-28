import { Theme, Themes } from '../types';
import { colors } from './colors';

export const themeLight: Theme = {
  background: {
    from: colors.neutrals.dimmed0,
    to: colors.neutrals.dimmed1,
  },
  headings: {
    title: colors.neutrals.dimmed9,
    subtitle: colors.neutrals.dimmed7,
  },
  axis: {
    label: colors.neutrals.dimmed5,
    tickLabel: colors.neutrals.dimmed4,
    tick: colors.neutrals.dimmed4,
    line: colors.neutrals.dimmed4,
  },
  grid: {
    line: colors.neutrals.dimmed2,
  },
};

export const themeDark: Theme = {
  background: {
    from: colors.neutrals.dimmed7,
    to: colors.neutrals.dimmed8,
  },
  headings: {
    title: colors.neutrals.dimmed0,
    subtitle: colors.neutrals.dimmed3,
  },
  axis: {
    label: colors.neutrals.dimmed2,
    tickLabel: colors.neutrals.dimmed4,
    tick: colors.neutrals.dimmed4,
    line: colors.neutrals.dimmed4,
  },
  grid: {
    line: colors.neutrals.dimmed6,
  },
};

export const theme: Themes = {
  light: themeLight,
  dark: themeDark,
};
