import { GameInstruction } from 'layouts';
import background from 'assets/images/Hungry_Crocodile_Game_Intro_Background.png';
import {
  CrocodileIntroSpectrumLine,
  CrocodileIntroSpectrumSpace,
  CrocodileLine,
  CrocodileSpace,
} from 'assets/svgs';
import { useNavigate } from 'react-router-dom';
import { useGameMode } from 'hooks';
import { CrocodileMode } from 'components';
import classNames from 'classnames';
import styles from './styles.module.scss';

export const HungryCrocodileIntro = (): JSX.Element => {
  const navigate = useNavigate();
  const { modeUpdate } = useGameMode('hungryCrocodileMode');

  const gameMode = Math.floor(Math.random() * (Object.keys(CrocodileMode).length / 2));

  const handleGameStart = () => {
    modeUpdate(gameMode);
    navigate('/HungryCrocodile/instruction', { state: { gameMode } });
  };

  return (
    <GameInstruction backgroundImage={background} onStart={handleGameStart}>
      <div className={styles.outer}>
        <div
          className={classNames(styles.inner, {
            [styles.disabled]: gameMode !== CrocodileMode.Space,
          })}
        >
          <CrocodileSpace />
          <CrocodileIntroSpectrumSpace />
        </div>
        <div
          className={classNames(styles.inner, {
            [styles.disabled]: gameMode !== CrocodileMode.Line,
          })}
        >
          <CrocodileLine />
          <CrocodileIntroSpectrumLine />
        </div>
      </div>
    </GameInstruction>
  );
};

export default HungryCrocodileIntro;
