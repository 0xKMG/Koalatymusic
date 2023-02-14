import { memo } from 'react';
import { Svg } from 'components';
import { ISvgIconProps } from 'types';

export const Star = memo<ISvgIconProps>((props, { className }) => (
  <Svg
    className={className}
    width="112.464"
    height="113.864"
    viewBox="0 0 112.464 113.864"
    {...props}
  >
    <path
      id="Path_3040"
      data-name="Path 3040"
      d="M490.793,241.8l7.565,28.755a5.113,5.113,0,0,0,3.213,3.509l27.977,10.07a5.113,5.113,0,0,1,1.034,9.111l-25.01,16.081a5.114,5.114,0,0,0-2.345,4.14L502.3,343.19a5.113,5.113,0,0,1-8.346,3.8l-23.022-18.816a5.114,5.114,0,0,0-4.662-.951l-28.552,8.3a5.113,5.113,0,0,1-6.192-6.763l10.781-27.71a5.113,5.113,0,0,0-.536-4.728l-16.715-24.59a5.113,5.113,0,0,1,4.519-7.979l29.685,1.691a5.115,5.115,0,0,0,4.331-1.972l18.221-23.495A5.113,5.113,0,0,1,490.793,241.8Z"
      transform="translate(-422.277 -236.161)"
      fill="#fcee21"
      stroke="#fff"
      strokeWidth="3.598"
    />
  </Svg>
));

Star.displayName = 'Star';

export default Star;
