import { ShellTrebleClefSpectrum, ShellBassClefSpectrum } from 'assets/svgs';
import background from 'assets/images/img/undersea01.png';
import { BackgroundImage, KoalaModel, AnswerFishModel } from 'components';
import { useGameMode, useGameScore, useCountup } from 'hooks';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ShellNode, ShellTypes, ShellSpectrum } from 'types';
import { BASS_LETTERS, TREBLE_LETTERS, SCORE_LIMIT } from 'constant';
import { BottomNav } from 'containers';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { ShellSpawning } from '../components';

export const ShellWePickGame = (): JSX.Element => {
  // hooks
  const navigate = useNavigate();
  const timeSpent = useCountup();
  const { scoreUpdate } = useGameScore('shellWePick');
  const { gameMode } = useGameMode('shellGameMode');
  // reference
  const nodeRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<Record<number, HTMLDivElement>>({});
  const scoreRef = useRef<number>(0);
  const letterPOSITIONING = [18, 28, 36, 44, 52, 60, 70];
  // state
  const [shells, setShells] = useState<ShellNode[]>([]);
  const [initialKoalaState, setinitialKoalaState] = useState<number>(80);
  const [initialKoalaStatus, setinitialKoalaStatus] = useState<number>(0);
  const [answerFishLetter, setanswerFishLetter] = useState<string>('');
  const [shellIndex, setShellIndex] = useState<number>(0);
  const [letterIndex, setLetterIndex] = useState<number>(0);
  const LETTERS = gameMode === ShellSpectrum.Treble ? TREBLE_LETTERS : BASS_LETTERS;
  const availableShellTypes = Object.keys(ShellTypes);
  const handleNavigation = () => {
    if (scoreRef.current === SCORE_LIMIT) {
      navigate('/ShellWePick/result');
    }
  };

  // Use useEffect to handle navigation based on conditions
  useEffect(() => {
    handleNavigation();
  }, [scoreRef.current]);

  const shellOnclick = useCallback(
    (id: number) => {
      // if (customScore === answerFishLetter) {
      const shell = shellRef.current[id];
      const customScore = shell?.getAttribute('custom-score');
      if (customScore === answerFishLetter) {
        setinitialKoalaStatus((prevState) => prevState + 1);
        setinitialKoalaState((prevState) => prevState - 5);
        scoreRef.current += 1;
        setLetterIndex((prev) => prev - prev);
        setShellIndex((prev) => prev - prev);
        setShells([]);
      } else {
        shell.setAttribute('style', 'opacity: 0;');
      }
    },
    [shellRef, answerFishLetter, setShells, setinitialKoalaStatus, setinitialKoalaState],
  );

  useEffect(() => {
    // Assuming ShellTypes is an enum or object with keys representing shell types
    // const shellArr = letterPOSITIONING.map((positionY, index) => ({
    //   id: index + 1, // Use index as id for uniqueness
    //   shell: Number(availableShellTypes[index]),
    //   positionX: -100 + index * 50, // Calculate the initial positionX based on index
    //   positionY, // Use the positionY from the array
    //   // letter: LETTERS[Math.floor(Math.random() * LETTERS.length)],
    //   letter: LETTERS[index],
    //   // spectrumWidth: SPECTRUM_WIDTH,
    // }));
    // setShells(shellArr);
    const interval = setInterval(() => {
      if (shellIndex < availableShellTypes.length / 2) {
        const newShell = {
          id: shellIndex + 1,
          shell: Number(availableShellTypes[shellIndex]),
          positionX: -100 + shellIndex * 50,
          positionY: Number(letterPOSITIONING[shellIndex]),
          letter: LETTERS[letterIndex],
        };

        setShells((prevShells) => [...prevShells, newShell]);
        setLetterIndex((prevIndex) => prevIndex + 1);
        setShellIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval); // Stop the interval when all shells are spawned
      }
    }, 2200); // Spawn a shell every 1000ms (1 second)

    return () => {
      clearInterval(interval);
    };
  }, [shellIndex, initialKoalaState]);

  useEffect(() => {
    setanswerFishLetter(LETTERS[Math.floor(Math.random() * LETTERS.length)]);

    return () => {
      scoreUpdate(scoreRef.current);
    };
  }, [initialKoalaState]);

  return (
    <div className={styles.crocodileGame}>
      <BackgroundImage source={background}>
        <div className={classNames(styles.gameArea, styles.scaled)}>
          <div className={styles.modelFish} ref={nodeRef}>
            <AnswerFishModel letter={answerFishLetter} />
          </div>
          <div className={styles.model} style={{ top: `${initialKoalaState}%` }} ref={nodeRef}>
            <KoalaModel status={initialKoalaStatus} />
          </div>
          <div className={styles.spectrum}>
            <div>
              {gameMode === ShellSpectrum.Treble ? (
                <ShellTrebleClefSpectrum />
              ) : (
                <ShellBassClefSpectrum />
              )}
            </div>
            <div className={styles.fruits}>
              {shells.map((props) => (
                <ShellSpawning
                  key={props.id}
                  // spectrumWidth={SPECTRUM_WIDTH}
                  ShellRef={(ref: HTMLDivElement) => {
                    shellRef.current[props.id] = ref;
                  }}
                  Onlclick={shellOnclick}
                  {...props}
                />
              ))}
            </div>
          </div>
        </div>
        <BottomNav time={timeSpent} score={scoreRef.current} scoreBoard />
      </BackgroundImage>
    </div>
  );
};

export default ShellWePickGame;
