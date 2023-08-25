import { TextAnchor } from './axis';

export type HeadingsStyleConfig = {
  height: number;
  fontFamily: string;
  title: {
    height: number;
    fill: string;
    fontSize: number;
    fontWeight: number;
    lineHeight: number;
    textAnchor: TextAnchor;
    verticalAnchor: TextAnchor;
    x: number;
    y: number;
  };
  subtitle: {
    height: number;
    fill: string;
    fontSize: number;
    fontWeight: number;
    lineHeight: number;
    textAnchor: TextAnchor;
    verticalAnchor: TextAnchor;
    x: number;
    y: number;
  };
}
