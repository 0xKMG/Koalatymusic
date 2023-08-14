import { GameInstruction } from 'layouts';
import background from 'assets/images/Hungry_Crocodile_Game_Intro_Background.png';
import instrustionPageBass from 'assets/images/shell_guide03.png';
import instrustionPageTreble from 'assets/images/shell_guide01.png';
import { useNavigate } from 'react-router-dom';
import { useGameMode } from 'hooks';
import { ShellSpectrum } from 'types';
import styles from './styles.module.scss';

export const ShallWePickInstruction = (): JSX.Element => {
  const navigate = useNavigate();

  const { gameMode } = useGameMode('shellGameMode');
  const handleGameStart = () => {
    navigate('/ShellWePick');
  };

  return (
    <GameInstruction backgroundImage={background} onStart={handleGameStart}>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <img
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            src={gameMode === ShellSpectrum.Treble ? instrustionPageTreble : instrustionPageBass}
            alt={
              gameMode === ShellSpectrum.Bass ? 'Instruction Page Bass' : 'Instruction Page Treble'
            }
          />
          {/* <h1>Hello</h1> */}
        </div>
      </div>
    </GameInstruction>
  );
};

export default ShallWePickInstruction;
