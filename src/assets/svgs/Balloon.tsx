import { memo } from 'react';
import { Svg } from 'components';
import { ISvgIconProps, ScaleTypeName } from 'types';

interface IBalloonProps extends ISvgIconProps {
  scale?: ScaleTypeName;
}

export const Balloon = memo<IBalloonProps>(({ className = '', scale, ...props }) => (
  <Svg
    width="117.184"
    height="134.573"
    viewBox="0 0 117.184 134.573"
    className={className}
    {...props}
  >
    <g id="Group_563" data-name="Group 563" transform="translate(-901 -745)">
      <g id="場景介面_森林氣球_氣球" transform="translate(-149.142 608.252)">
        <path
          id="Path_1749"
          data-name="Path 1749"
          d="M1104.37,271.321a7.8,7.8,0,0,1-4.187-1.218,9.208,9.208,0,0,1-3.928.9h-.116a9.208,9.208,0,0,1-6.671-3.231c-.143,0-.283.007-.424.007a9.666,9.666,0,0,1-7.839-3.624,9.345,9.345,0,0,1-2.023-7.3c.011-.067.022-.134.034-.2-15.278-9.23-26.818-26.869-28.7-44.524-2.389-22.381,6.722-43.831,25.651-60.4,5.021-4.4,14.622-10.53,21.376-12.774a43.959,43.959,0,0,1,13.891-2.2,49.936,49.936,0,0,1,24.63,6.6c10.736,6.108,19.708,16.312,25.261,28.732,8.723,19.508,7.887,42.632-2.182,60.347-10.5,18.474-27.946,30.26-46.006,31.271a8.33,8.33,0,0,1-.565,1.856c-1.271,2.87-4.3,5.765-8.2,5.765Z"
          fill="#fff"
        />
        <path
          id="Path_1750"
          data-name="Path 1750"
          d="M1156.76,174.123c-4.863-10.876-12.814-20.536-23.169-26.427s-23.166-7.757-34.471-4c-5.893,1.958-14.987,7.7-19.66,11.791-15.978,13.986-26.366,33.678-23.973,56.108,1.877,17.6,14.229,35.253,30.227,42.887a6.328,6.328,0,0,0-1.6,3.169,4.333,4.333,0,0,0,.987,3.37c1.728,2.152,4.431,2,7.022,1.257a4.712,4.712,0,0,0,4.08,3.723,4.869,4.869,0,0,0,4.4-3.228c2.393,5.76,6.236,3.375,7.393.76a6.861,6.861,0,0,0-.36-4.857l1.416.066c19.31.719,36.192-11.984,45.741-28.783s9.852-38.2,1.964-55.835Z"
          fill="#ff6d24"
        />
      </g>
      <text
        id="G"
        transform="translate(936 831)"
        fill="#fff"
        fontSize="60"
        fontFamily="ChiayiCityFont"
        fontWeight="700"
        letterSpacing="0.05em"
      >
        <tspan x="0" y="0">
          {scale}
        </tspan>
      </text>
    </g>
  </Svg>
));

Balloon.displayName = 'Balloon';

export default Balloon;
