import { GameInstruction } from 'layouts';
import background from 'assets/images/Hungry_Crocodile_Game_Intro_Background.png';
import {
  CrocodileIntroSpectrumLine,
  CrocodileIntroSpectrumSpace,
  CrocodileLine,
  CrocodileSpace,
} from 'assets/svgs';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useGameMode } from 'hooks';
import { CrocodileMode } from 'components';
import classNames from 'classnames';
import soundEffectLine from 'assets/audio/sound_effect_line.mp3';
import soundEffectSpace from 'assets/audio/sound_effect_space.mp3';

import styles from './styles.module.scss';

interface LocationState {
  gameMode: CrocodileMode; // Replace `number` with the type of `gameMode`
}

export const HungryCrocodileIntro = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { gameMode } = location.state as LocationState;
  const { modeUpdate } = useGameMode('hungryCrocodileMode');
  useEffect(() => {
    const audioFile = gameMode === CrocodileMode.Line ? soundEffectLine : soundEffectSpace;
    const audio = new Audio(audioFile);
    audio.play();
  }, [gameMode]);

  const handleGameStart = () => {
    modeUpdate(gameMode);
    navigate('/HungryCrocodile');
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
