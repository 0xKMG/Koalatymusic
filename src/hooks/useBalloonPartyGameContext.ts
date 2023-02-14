import { ANIMATION_TIME } from 'constant';
import BalloonParty from 'context/store/BalloonParty';
import { useContext } from 'react';
import { ScaleType } from 'types';
import { checkAnsMismatch } from 'utils';
import useGameMode from './useGameMode';

interface IUseBalloonPartyGameContextReturn {
  attempted: number;
  clearAttempt: () => void;
  addAttempt: () => void;
  coordinate: { x: number; y: number };
  updateCoordinate: (x: number, y: number) => void;
  incorrect: boolean;
  staffMismatch: boolean;
  setIsStaffMismatch: (sc: ScaleType, y: number) => void;
}

export const useBalloonPartyGameContext = (): IUseBalloonPartyGameContextReturn => {
  const {
    attempted,
    setAttempted,
    coordinate,
    setCoordinate,
    incorrect,
    setIncorrect,
    staffMismatch,
    setStaffMismatch,
  } = useContext(BalloonParty);
  const { gameMode } = useGameMode('balloonPartyMode');

  const clearAttempt = () => {
    setTimeout(() => {
      setAttempted(0);
      setIncorrect(false);
    }, 1);
  };
  const addAttempt = () => {
    setIncorrect(true);
    setTimeout(() => {
      setAttempted((v) => v + 1);
      setCoordinate({ x: 0, y: 0 });
      setIncorrect(false);
    }, ANIMATION_TIME);
  };

  const updateCoordinate = (x: number, y: number) => {
    setCoordinate({ x, y });
  };

  const setIsStaffMismatch = (sc: ScaleType, y: number) => {
    setStaffMismatch(checkAnsMismatch(sc, y, gameMode));
    setTimeout(() => {
      setStaffMismatch(false);
    }, ANIMATION_TIME);
  };

  return {
    attempted,
    clearAttempt,
    addAttempt,
    coordinate,
    updateCoordinate,
    incorrect,
    staffMismatch,
    setIsStaffMismatch,
  };
};

export default useBalloonPartyGameContext;
