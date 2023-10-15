import { GameInstruction } from 'layouts';
import background from 'assets/images/Hungry_Crocodile_Game_Intro_Background.png';
import instructionPageLine from 'assets/images/instructionPageLine.png';
import instructionPageSpace from 'assets/images/instructionPageSpace.png';
import { useNavigate } from 'react-router-dom';

import { useAudioOnce, useGameMode } from 'hooks';
import { CrocodileMode } from 'components';
// Import the sound effects for each game mode
import soundEffectLine from 'assets/audio/sound_effect_line.mp3';
import soundEffectSpace from 'assets/audio/sound_effect_space.mp3';

import styles from './styles.module.scss';

export const HungryCrocodileInstruction = (): JSX.Element => {
  const { modeUpdate } = useGameMode('hungryCrocodileMode');

  const gameMode = Math.floor(Math.random() * (Object.keys(CrocodileMode).length / 2));

  const navigate = useNavigate();

  const audioFile = gameMode === CrocodileMode.Line ? soundEffectLine : soundEffectSpace;

  const { play } = useAudioOnce({
    source: audioFile,
  });

  const handleGameStart = () => {
    play();
    modeUpdate(gameMode);
    navigate('/HungryCrocodile');
  };

  return (
    <GameInstruction backgroundImage={background} onStart={handleGameStart}>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <img
            src={gameMode === CrocodileMode.Line ? instructionPageLine : instructionPageSpace}
            alt={
              gameMode === CrocodileMode.Line ? 'Instruction Page Line' : 'Instruction Page Space'
            }
          />
        </div>
      </div>
    </GameInstruction>
  );
};

export default HungryCrocodileInstruction;
