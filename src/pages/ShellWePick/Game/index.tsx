import { ShellTrebleClefSpectrum, ShellBassClefSpectrum } from 'assets/svgs';
import background from 'assets/images/img/undersea01.png';
import { BackgroundImage, KoalaModel, AnswerFishModel } from 'components';
import { useCountdown, useGameMode, useGameScore } from 'hooks';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ShellNode, ShellTypes, ShellSpectrum } from 'types';
import { GAME_TIME, LETTERS, SCORE_LIMIT } from 'constant';
import { BottomNav } from 'containers';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { ShellSpawning } from '../components';

export const ShellWePickGame = (): JSX.Element => {
  // hooks
  const navigate = useNavigate();
  const timeLeft = useCountdown(GAME_TIME);
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

  const handleNavigation = () => {
    if (timeLeft === 0 || scoreRef.current === SCORE_LIMIT) {
      navigate('/ShellWePick/result');
    }
  };

  // Use useEffect to handle navigation based on conditions
  useEffect(() => {
    handleNavigation();
  }, [timeLeft, scoreRef.current]);

  const shellOnclick = useCallback(
    (id: number) => {
      // if (customScore === answerFishLetter) {
      const shell = shellRef.current[id];
      const customScore = shell?.getAttribute('custom-score');
      if (customScore === answerFishLetter) {
        setinitialKoalaStatus((prevState) => prevState + 1);
        setinitialKoalaState((prevState) => prevState - 5);
        scoreRef.current += 1;
        setShells([]);
      } else {
        shell.setAttribute('style', 'opacity: 0;');
      }
    },
    [shellRef, answerFishLetter, setShells, setinitialKoalaStatus, setinitialKoalaState],
  );

  // Shuffle an array using the Fisher-Yates shuffle algorithm
  const shuffleArray = (array: string[]) => {
    const shuffledArray = [...array];
    // eslint-disable-next-line no-plusplus
    for (let i: number = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    // Assuming ShellTypes is an enum or object with keys representing shell types
    const availableShellTypes = Object.keys(ShellTypes);
    const shuffledLetters = shuffleArray(LETTERS);
    setanswerFishLetter(LETTERS[Math.floor(Math.random() * LETTERS.length)]);
    const shellArr = letterPOSITIONING.map((positionY, index) => ({
      id: index + 1, // Use index as id for uniqueness
      shell: Number(availableShellTypes[index]),
      positionX: -100 + index * 50, // Calculate the initial positionX based on index
      positionY, // Use the positionY from the array
      // letter: LETTERS[Math.floor(Math.random() * LETTERS.length)],
      letter: shuffledLetters[index % shuffledLetters.length],
      // spectrumWidth: SPECTRUM_WIDTH,
    }));
    setShells(shellArr);
    return () => {
      scoreUpdate(scoreRef.current);
      setShells([]);
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
        <BottomNav time={timeLeft} score={scoreRef.current} scoreBoard />
      </BackgroundImage>
    </div>
  );
};

export default ShellWePickGame;
