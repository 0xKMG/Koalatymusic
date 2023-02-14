import audioEffect from 'assets/audio/Game_Menu_Click.mp3';
import useSound from 'use-sound';
import { HTMLAttributes, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'hooks';
import { NiceTry, WellDone } from 'assets/svgs';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { KoalaType, NiceTryModel, WellDoneModel } from './models';

export interface IEndingKoalaProps extends HTMLAttributes<HTMLDivElement> {
  model: KoalaType;
  path?: string;
  scale?: number;
}

export const EndingKoala = memo(
  ({ model, path, scale = 1, className, ...props }: IEndingKoalaProps): JSX.Element => {
    const navigate = useNavigate();
    const { innerWidth } = useWindowSize();
    const [play] = useSound(audioEffect);

    const handleHomeClick = () => {
      play();
      navigate('/menu');
    };
    const handlePlayAgainClick = () => {
      play();
      navigate(path as string);
    };

    const Content = useCallback(
      () => (
        <div
          className={classNames(styles.content, {
            [styles.contentRight]: model === KoalaType.ThumbUp,
          })}
        >
          <div>{{ ThumbUp: <NiceTry />, Salute: <WellDone /> }[KoalaType[model]]}</div>
          <div className={styles.buttonArea}>
            {path && (
              <button type="button" onClick={handlePlayAgainClick}>
                Play again
              </button>
            )}
            <button type="button" onClick={handleHomeClick}>
              Home
            </button>
          </div>
        </div>
      ),
      [model],
    );

    return (
      <div className={styles.overlay}>
        <div className={classNames(styles.model, className)} {...props}>
          <div className={styles.modelAspect} style={{ width: (380 / 810) * innerWidth * scale }}>
            {
              {
                ThumbUp: <NiceTryModel content={<Content />} />,
                Salute: <WellDoneModel content={<Content />} />,
              }[KoalaType[model]]
            }
          </div>
        </div>
      </div>
    );
  },
);
EndingKoala.displayName = 'EndingKoala';
export default EndingKoala;
