import React, { useMemo, useState } from 'react';
import { BalloonParty } from './store';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const BalloonPartyProvider = ({ children }: Props): JSX.Element => {
  const [attempted, setAttempted] = useState<number>(0);
  const [coordinate, setCoordinate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [incorrect, setIncorrect] = useState<boolean>(false);
  const [staffMismatch, setStaffMismatch] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      attempted,
      setAttempted,
      coordinate,
      setCoordinate,
      incorrect,
      setIncorrect,
      staffMismatch,
      setStaffMismatch,
    }),
    [attempted, coordinate, incorrect, staffMismatch],
  );

  return <BalloonParty.Provider value={value}>{children}</BalloonParty.Provider>;
};

export default BalloonPartyProvider;
