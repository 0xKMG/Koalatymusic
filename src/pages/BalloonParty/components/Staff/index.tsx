import { AnswerBalloon, Balloon, BassClef, BassStaff, TrebleClef, TrebleStaff } from 'assets/svgs';
import classNames from 'classnames';
import { BASS_BALLOONS, TREBLE_BALLOONS } from 'constant';
import { useBalloonPartyGameContext } from 'hooks';
import { memo } from 'react';
import { BalloonType, IMusicBalloonNode, ScaleType, ScaleTypeName, Spectrum } from 'types';
import styles from './styles.module.scss';

export interface IStaffModelProps {
  type: Spectrum;
  balloons: IMusicBalloonNode[];
  shadow?: number[];
}

export const Staff = memo<IStaffModelProps>(({ type, balloons, shadow }) => {
  const BalloonStyle = { width: 'calc( 100vw * 0.045) ' };
  const { staffMismatch } = useBalloonPartyGameContext();

  return (
    <div className={styles.staff}>
      {
        {
          Bass: <BassStaff />,
          Treble: <TrebleStaff />,
        }[Spectrum[type]]
      }
      {balloons.map((props) => (
        <div
          key={props.positionY}
          style={{
            top: `${-10 + props.positionY * 7.8}%`,
            left: `${9 + props.positionX * 6.75}%`,
          }}
          className={classNames(styles.balloons, {
            [styles.hidden]: props.type === BalloonType.Hidden,
            [styles.hint]: props.type === BalloonType.Hint,
          })}
        >
          {props.type === BalloonType.Answer ? (
            <AnswerBalloon style={BalloonStyle} />
          ) : (
            <Balloon
              style={BalloonStyle}
              scale={
                props.type !== BalloonType.NotGiven
                  ? (ScaleType[props.scale] as ScaleTypeName)
                  : undefined
              }
            />
          )}
        </div>
      ))}

      {
        {
          Bass: (
            <div
              className={classNames(styles.clef, styles.clefBass, {
                [styles.misMatch]: staffMismatch,
              })}
            >
              <BassClef />
            </div>
          ),
          Treble: (
            <div
              className={classNames(styles.clef, styles.clefTreble, {
                [styles.misMatch]: staffMismatch,
              })}
            >
              <TrebleClef />
            </div>
          ),
        }[Spectrum[staffMismatch ? (type + 1) % 2 : type]]
      }
      <div>
        {shadow?.map((v) => (
          <div
            key={v}
            className={classNames(styles.shadow, { [styles.bass]: type === Spectrum.Bass })}
            style={{ top: `${-6.7 + v * 7.8}%` }}
          >
            {type === Spectrum.Treble
              ? ScaleType[TREBLE_BALLOONS[v].scale]
              : ScaleType[BASS_BALLOONS[v].scale]}
          </div>
        ))}
      </div>
    </div>
  );
});

Staff.displayName = 'Staff';
export default Staff;
