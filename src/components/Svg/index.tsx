import { memo, SVGProps } from 'react';

export interface ISvgProps extends SVGProps<SVGSVGElement> {
  children: JSX.Element | JSX.Element[];
  className: string;
  width?: string;
  height?: string;
  viewBox: string;
  onClick?: () => void;
}

export const Svg = memo<ISvgProps>(
  ({ children, className, width, height, viewBox, onClick, ...props }) => (
    <svg
      version="1.1"
      className={className}
      width={width}
      height={height}
      viewBox={viewBox}
      onClick={onClick}
      {...props}
    >
      {children}
    </svg>
  ),
);

Svg.displayName = 'Svg';

export default Svg;
