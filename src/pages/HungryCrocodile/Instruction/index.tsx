import { GameInstruction } from 'layouts';
import background from 'assets/images/Hungry_Crocodile_Game_Intro_Background.png';
import instructionPageLine from 'assets/images/instructionPageLine.png';
import instructionPageSpace from 'assets/images/instructionPageSpace.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGameMode } from 'hooks';
import { CrocodileMode } from 'components';
import styles from './styles.module.scss';

interface LocationState {
  gameMode: CrocodileMode; // Replace `number` with the type of `gameMode`
}

export const HungryCrocodileInstruction = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { gameMode } = location.state as LocationState;
  const { modeUpdate } = useGameMode('hungryCrocodileMode');
  const handleGameStart = () => {
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
