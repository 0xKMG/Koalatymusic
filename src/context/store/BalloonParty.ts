import { createContext, Dispatch, SetStateAction } from 'react';

interface Props {
  coordinate: { x: number; y: number };
  setCoordinate: Dispatch<SetStateAction<{ x: number; y: number }>>;
  attempted: number;
  setAttempted: Dispatch<SetStateAction<number>>;
  incorrect: boolean;
  setIncorrect: Dispatch<SetStateAction<boolean>>;
  staffMismatch: boolean;
  setStaffMismatch: Dispatch<SetStateAction<boolean>>;
}

export const BalloonParty = createContext({} as Props);

export default BalloonParty;
