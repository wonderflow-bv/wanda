import { ThemeVariants } from './themes';

export type TooltipStyleMain = {
  color: string;
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
  overflow: string;
  padding: string;
  borderRadius: string;
  zIndex: string;
}

export type TooltipStyleColors = {
  backdropFilter: string;
  background: string;
  border: string;
  boxShadow: string;
  color: string;
}

export type TooltipStyleConfig = TooltipStyleColors & TooltipStyleMain;

export type TooltipStyleTheme = Record<ThemeVariants, TooltipStyleConfig>;
