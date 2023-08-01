import { ShellTrebleClefSpectrum } from 'assets/svgs';
import background from 'assets/images/img/undersea01.png';
import { BackgroundImage, CrocodileMode, KoalaModel, AnswerFishModel } from 'components';
import { useCountdown, useGameMode, useGameScore } from 'hooks';
import Draggable, { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FruitTypes, IFruitNode, ShellNode, ShellTypes } from 'types';
import sleep from 'sleep-promise';
import { GAME_TIME, LINE_POSITIONING, SPACE_POSITIONING } from 'constant';
import { BottomNav } from 'containers';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { ShellSpawning } from '../components';

export const ShellWePickGame = (): JSX.Element => {
  // hooks
  const navigate = useNavigate();
  const timeLeft = useCountdown(GAME_TIME);
  const { scoreUpdate } = useGameScore('hungryCrocodile');
  const { gameMode } = useGameMode('hungryCrocodileMode');
  // reference
  const modelRef = useRef<DraggableCore>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const modelPositionRef = useRef<number | null>(null);
  const fruitsRef = useRef<Record<number, HTMLDivElement>>({});
  const shellRef = useRef<Record<number, HTMLDivElement>>({});
  const answerFishRef = useRef<Record<number, HTMLDivElement>>({});
  const scoreRef = useRef<number>(0);
  const isDizzyRef = useRef<boolean>(false);
  const treblePOSITIONING = [18, 28, 36, 44, 52, 60, 70];
  // state
  const [fruits, setFruits] = useState<IFruitNode[]>([]);
  const [shells, setShells] = useState<ShellNode[]>([]);
  const [initialKoalaState, setinitialKoalaState] = useState<number>((70));
  // const SPECTRUM_WIDTH = (62 / 100);
  // const [crocodileStatus, setCrocodileStatus] = useState<CrocodileStatus>(0);

  // const scoreIncrease = async (add: number) => {
  //   scoreRef.current += add;
  //   const EATING = [1, 0, 1, 0];
  //   let i = 0;
  //   do {
  //     // setCrocodileStatus(EATING[i]);
  //     // eslint-disable-next-line no-await-in-loop
  //     await sleep(80);
  //     i += 1;
  //   } while (i < EATING.length);
  // };

  const getClosestFruit = (): HTMLDivElement => {
    const activeNode = Object.values(fruitsRef.current).filter(
      (v) => v && !v.className.includes(styles.end) && v.offsetLeft <= 60,
    );
    return activeNode[activeNode.length - 1];
  };
  const shellOnclick = () => {
    setShells([]);
    setinitialKoalaState(initialKoalaState - 5);
  };
  // const onCollide = async (crocodileAxisY: number, fruitNode?: HTMLDivElement) => {
  //   if (!fruitNode) {
  //     return;
  //   }
  //   const collisionMax = fruitNode.offsetTop + fruitNode.clientHeight;
  //   if (fruitNode.offsetTop <= crocodileAxisY && collisionMax >= crocodileAxisY) {
  //     fruitNode.classList.add(styles.end, styles.paused);
  //     const itemScore = fruitNode.getAttribute('custom-score') || 1;
  //     const fruitType = fruitNode.getAttribute('custom-type');

  //     if (fruitType === String(gameMode)) {
  //       scoreIncrease(Number(itemScore));
  //     } else {
  //       onDizzy();
  //     }
  //   }
  // };

  // const handleDrag = (e: DraggableEvent, d: DraggableData) => {
  //   // 1 = crocodile eye level; 1.08 = mouth
  //   const crocodileAxisY = (nodeRef.current!.offsetTop + d.y) * 1.1;
  //   modelPositionRef.current = crocodileAxisY;
  //   onCollide(crocodileAxisY, getClosestFruit());
  // };

  // Spawn items
  useEffect(() => {
    const type = Math.floor(Math.random() * 2);
    const positionY =
      type === CrocodileMode.Line
        ? LINE_POSITIONING[Math.floor(Math.random() * LINE_POSITIONING.length)]
        : SPACE_POSITIONING[Math.floor(Math.random() * SPACE_POSITIONING.length)];
    const isStarFruit = type === gameMode && (positionY < 10 || positionY > 80);
    const fruitArr = [
      ...fruits,
      {
        id: timeLeft,
        isStar: isStarFruit,
        fruit: Math.floor(Math.random() * (Object.keys(FruitTypes).length / 2)),
        positionY,
        type,
        score: isStarFruit ? 2 : 1,
      },
    ];
    // const shellArr = [
    //   ...shells,
    //   {
    //     id: timeLeft,
    //     shell: Math.floor(Math.random() * (Object.keys(ShellTypes).length / 2)),
    //     positionY: treblePOSITIONING[Math.floor(Math.random() * treblePOSITIONING.length)],
    //     score: 1,
    //   },
    // ];
    if (timeLeft < GAME_TIME - 5) {
      fruitArr.splice(0, 1);
      // shellArr.splice(0, 1);
    }
    setFruits(fruitArr);
    // setShells(shellArr);

    if (timeLeft === 0) {
      scoreUpdate(scoreRef.current);
      navigate('/ShellWePick/result');
    }
  }, [timeLeft]);

  // Passive collision detection
  useEffect(() => {
    const interval = setInterval(() => {
      const closest = getClosestFruit();
      // onCollide(modelPositionRef.current ?? 0, closest);
      if (closest && closest.offsetLeft < 30) {
        closest.classList.add(styles.end);
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const shellArr = treblePOSITIONING.map((positionY, index) => ({
      id: index + 1, // Use index as id for uniqueness
      shell: Math.floor(Math.random() * (Object.keys(ShellTypes).length / 2)),
      positionX: -100 + index * 50, // Calculate the initial positionX based on index
      positionY, // Use the positionY from the array
      score: 1,
      // spectrumWidth: SPECTRUM_WIDTH,
    }));
    setShells(shellArr);
  }, [initialKoalaState]);

  return (
    <div className={styles.crocodileGame}>
      <BackgroundImage source={background}>

        <div className={classNames(styles.gameArea, styles.scaled)}>
          <div className={styles.modelFish} ref={nodeRef}>
            <AnswerFishModel letter={0} />
          </div>
          <div className={styles.model} style={{ top: `${initialKoalaState}%` }} ref={nodeRef}>
            <KoalaModel status={0} />
          </div>
          <div className={styles.spectrum}>
            <div>
              <ShellTrebleClefSpectrum />
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
