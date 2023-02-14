import { memo } from 'react';
import { Svg } from 'components';
import { ISvgIconProps } from 'types';

export const FruitStar = memo<ISvgIconProps>((props, { className }) => (
  <Svg className={className} width="100" height="101.105" viewBox="0 0 100 101.105" {...props}>
    <g id="Star" transform="translate(-1685.95 -1452.895)">
      <path
        id="Path_3797"
        data-name="Path 3797"
        d="M1751.65,1533.1l-14.812-8.059a2.463,2.463,0,0,0-2.292-.033l-15.036,7.634a2.463,2.463,0,0,1-3.536-2.647l3.087-16.578a2.463,2.463,0,0,0-.677-2.19l-11.906-11.941a2.463,2.463,0,0,1,1.425-4.181l16.72-2.187a2.463,2.463,0,0,0,1.873-1.321l7.677-15.014a2.463,2.463,0,0,1,4.417.063l7.247,15.226a2.463,2.463,0,0,0,1.835,1.374l16.651,2.662a2.463,2.463,0,0,1,1.3,4.22l-12.241,11.6a2.463,2.463,0,0,0-.739,2.17l2.614,16.659a2.463,2.463,0,0,1-3.61,2.545Z"
        fill="#fcee21"
      />
    </g>
  </Svg>
));

FruitStar.displayName = 'FruitStar';

export default FruitStar;
