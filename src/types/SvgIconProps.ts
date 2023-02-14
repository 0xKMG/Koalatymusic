import { CSSProperties } from 'react';

export interface ISvgIconProps {
  className?: string;
  style?: CSSProperties;
  preserveAspectRatio?: string;
  color?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
}
