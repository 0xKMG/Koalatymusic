// import { CrocodileIntroFiveLineSpectrum } from 'assets/svgs';
// import background from 'assets/images/Hungry_Crocodile_Game_Intro_Background.png';
// import { BackgroundImage, CrocodileMode, CrocodileModel, CrocodileStatus } from 'components';
// import { useCountdown, useGameMode, useGameScore } from 'hooks';
// import Draggable, { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import { FruitTypes, IFruitNode } from 'types';
// import sleep from 'sleep-promise';
// import { GAME_TIME, LINE_POSITIONING, SPACE_POSITIONING } from 'constant';
// import { TopNav } from 'containers';
import { useNavigate } from 'react-router-dom';
// import classNames from 'classnames';
// import styles from './styles.module.scss';
// import { FruitSpawning } from '../components';

export const ShellWePickGame = (): JSX.Element => {
  // hooks
  const navigate = useNavigate();
  //   const timeLeft = useCountdown(GAME_TIME);
  //   const { scoreUpdate } = useGameScore('hungryCrocodile');
  //   const { gameMode } = useGameMode('hungryCrocodileMode');
  //   // reference
  //   const modelRef = useRef<DraggableCore>(null);
  //   const nodeRef = useRef<HTMLDivElement>(null);
  //   const modelPositionRef = useRef<number | null>(null);
  //   const fruitsRef = useRef<Record<number, HTMLDivElement>>({});
  //   const scoreRef = useRef<number>(0);
  //   const isDizzyRef = useRef<boolean>(false);
  //   // state
  //   const [fruits, setFruits] = useState<IFruitNode[]>([]);
  //   const [crocodileStatus, setCrocodileStatus] = useState<CrocodileStatus>(0);
  //

  return (
    <div>
      <h1>Shell We Pick placeholder</h1>
    </div>
  );
};
export default ShellWePickGame;
