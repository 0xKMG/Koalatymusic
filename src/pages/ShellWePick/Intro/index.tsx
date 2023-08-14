import { GameInstruction } from 'layouts';
import background from 'assets/images/img/undersea01.png';
import bass from 'assets/images/Balloon_Party_Level_Bass.png';
import treble from 'assets/images/Balloon_Party_Level_Treble.png';
import shuffle from 'assets/images/Balloon_Party_Level_Shuffle.png';
import { ShellWeIntroBassClef, ShellWeIntroTrebleClef } from 'assets/svgs';
import { ImageButton } from 'components';
import { useRef, useState } from 'react';
import { ShellSpectrum } from 'types';
import bassAudioEffect from 'assets/audio/Bass_Clef.mp3';
import trebleAudioEffect from 'assets/audio/Treble_Clef.mp3';
import useSound from 'use-sound';
import { useNavigate } from 'react-router-dom';
import sleep from 'sleep-promise';
import { useGameMode } from 'hooks';
import styles from './styles.module.scss';

export const ShellWePickIntro = (): JSX.Element => {
  const navigate = useNavigate();
  const { modeUpdate } = useGameMode('shellGameMode');
  const [playBass] = useSound(bassAudioEffect);
  const [playTreble] = useSound(trebleAudioEffect);
  // State
  const [spectrum, setSpectrum] = useState<ShellSpectrum>();
  const [freeze, setFreeze] = useState<boolean>(true);
  // Reference
  const shuffleRef = useRef<boolean>(false);

  const handleStartClick = (selection: ShellSpectrum) => {
    if (shuffleRef.current) {
      return;
    }
    setFreeze(false);
    setSpectrum(selection);
    if (selection === ShellSpectrum.Bass) {
      playBass();
    } else {
      playTreble();
    }
  };

  const handleRandomPick = async () => {
    if (shuffleRef.current) {
      return;
    }
    shuffleRef.current = true;
    setFreeze(true);
    let time = 0;
    do {
      setSpectrum(time % 2);
      time += 1;
      // eslint-disable-next-line no-await-in-loop
      await sleep(Math.max(100, time * 30));
    } while (time < 12);
    if (Math.random() > 0.5) {
      playBass();
      setSpectrum(ShellSpectrum.Bass);
    } else {
      playTreble();
      setSpectrum(ShellSpectrum.Treble);
    }
    shuffleRef.current = false;
    setFreeze(false);
  };

  const handleInstruction = () => {
    modeUpdate(spectrum as ShellSpectrum);
    navigate('/ShellWePick/instruction');
  };

  return (
    <GameInstruction backgroundImage={background} onStart={handleInstruction} disabled={freeze}>
      <div className={styles.outer}>
        <div className={styles.level}>
          <ImageButton
            className={styles.button}
            onClick={() => handleStartClick(ShellSpectrum.Treble)}
          >
            <img src={treble} alt="treble" />
          </ImageButton>
          <ImageButton
            className={styles.button}
            onClick={() => handleStartClick(ShellSpectrum.Bass)}
          >
            <img src={bass} alt="bass" />
          </ImageButton>
          <ImageButton className={styles.button} onClick={handleRandomPick}>
            <img src={shuffle} alt="shuffle" />
          </ImageButton>
        </div>

        <div className={styles.spectrum}>
          {spectrum === undefined ? (
            <>
              <ShellWeIntroTrebleClef />
              <ShellWeIntroBassClef />
            </>
          ) : (
            {
              [ShellSpectrum.Treble]: <ShellWeIntroTrebleClef />,
              [ShellSpectrum.Bass]: <ShellWeIntroBassClef />,
            }[spectrum]
          )}
        </div>
      </div>
    </GameInstruction>
  );
};

export default ShellWePickIntro;
