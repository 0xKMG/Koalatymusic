import { CrocodileIntroFiveLineSpectrum } from 'assets/svgs';
import background from 'assets/images/Hungry_Crocodile_Game_Intro_Background.png';
import { BackgroundImage, CrocodileMode, CrocodileModel, CrocodileStatus } from 'components';
import { useCountdown, useGameMode, useGameScore } from 'hooks';
import Draggable, { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FruitTypes, IFruitNode } from 'types';
import sleep from 'sleep-promise';
import { GAME_TIME, LINE_POSITIONING, SPACE_POSITIONING } from 'constant';
import { TopNav } from 'containers';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { FruitSpawning } from '../components';

export const HungryCrocodileGame = (): JSX.Element => {
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
  const scoreRef = useRef<number>(0);
  const isDizzyRef = useRef<boolean>(false);
  // state
  const [fruits, setFruits] = useState<IFruitNode[]>([]);
  const [crocodileStatus, setCrocodileStatus] = useState<CrocodileStatus>(0);

  const scoreIncrease = async (add: number) => {
    scoreRef.current += add;
    const EATING = [1, 0, 1, 0];
    let i = 0;
    do {
      setCrocodileStatus(EATING[i]);
      // eslint-disable-next-line no-await-in-loop
      await sleep(80);
      i += 1;
    } while (i < EATING.length);
  };

  const getClosestFruit = (): HTMLDivElement => {
    const activeNode = Object.values(fruitsRef.current).filter(
      (v) => v && !v.className.includes(styles.end) && v.offsetLeft <= 60,
    );
    return activeNode[activeNode.length - 1];
  };

  const onDizzy = useCallback(async () => {
    setCrocodileStatus(CrocodileStatus.Dizzy);
    await sleep(1800);
    if (isDizzyRef.current) {
      setCrocodileStatus(CrocodileStatus.Closed);
    }
  }, [crocodileStatus]);

  const onCollide = async (crocodileAxisY: number, fruitNode?: HTMLDivElement) => {
    if (!fruitNode) {
      return;
    }
    const collisionMax = fruitNode.offsetTop + fruitNode.clientHeight;
    if (fruitNode.offsetTop <= crocodileAxisY && collisionMax >= crocodileAxisY) {
      fruitNode.classList.add(styles.end, styles.paused);
      const itemScore = fruitNode.getAttribute('custom-score') || 1;
      const fruitType = fruitNode.getAttribute('custom-type');

      if (fruitType === String(gameMode)) {
        scoreIncrease(Number(itemScore));
      } else {
        onDizzy();
      }
    }
  };

  const handleDrag = (e: DraggableEvent, d: DraggableData) => {
    // 1 = crocodile eye level; 1.08 = mouth
    const crocodileAxisY = (nodeRef.current!.offsetTop + d.y) * 1.1;
    modelPositionRef.current = crocodileAxisY;
    onCollide(crocodileAxisY, getClosestFruit());
  };

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
    if (timeLeft < GAME_TIME - 5) {
      fruitArr.splice(0, 1);
    }
    setFruits(fruitArr);

    if (timeLeft === 0) {
      scoreUpdate(scoreRef.current);
      navigate('/HungryCrocodile/result');
    }
  }, [timeLeft]);

  // Dizzy handling
  useEffect(() => {
    if (crocodileStatus === CrocodileStatus.Dizzy) {
      isDizzyRef.current = true;
    } else isDizzyRef.current = false;
  }, [crocodileStatus]);

  // Passive collision detection
  useEffect(() => {
    const interval = setInterval(() => {
      const closest = getClosestFruit();
      onCollide(modelPositionRef.current ?? 0, closest);
      if (closest && closest.offsetLeft < 30) {
        closest.classList.add(styles.end);
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.crocodileGame}>
      <BackgroundImage source={background}>
        <TopNav time={timeLeft} score={scoreRef.current} scoreBoard />
        <div className={classNames(styles.gameArea, styles.scaled)}>
          <Draggable
            axis="y"
            bounds="parent"
            onDrag={handleDrag}
            disabled={timeLeft <= 0}
            ref={modelRef}
            nodeRef={nodeRef}
          >
            <div className={styles.model} ref={nodeRef}>
              <CrocodileModel status={crocodileStatus} type={gameMode} />
            </div>
          </Draggable>
          <div className={styles.spectrum}>
            <div>
              <CrocodileIntroFiveLineSpectrum />
            </div>
            <div className={styles.fruits}>
              {fruits.map((props) => (
                <FruitSpawning
                  key={props.id}
                  fruitRef={(ref: HTMLDivElement) => {
                    fruitsRef.current[props.id] = ref;
                  }}
                  {...props}
                />
              ))}
            </div>
          </div>
        </div>
      </BackgroundImage>
    </div>
  );
};

export default HungryCrocodileGame;
