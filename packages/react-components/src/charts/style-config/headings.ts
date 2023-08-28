import { HeadingsStyleConfig } from '../types';
import { themeLight } from './themes';

export const headingsStyleConfig: HeadingsStyleConfig = {
  height: 50,
  fontFamily: 'system-ui',
  title: {
    height: 23.5,
    fill: themeLight.headings.title,
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.25,
    textAnchor: 'start',
    verticalAnchor: 'start',
    x: 0,
    y: 0,
  },
  subtitle: {
    height: 19,
    fill: themeLight.headings.subtitle,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1,
    textAnchor: 'start',
    verticalAnchor: 'start',
    x: 0,
    y: 25,
  },
};
