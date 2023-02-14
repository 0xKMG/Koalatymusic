import React, { useMemo, useState } from 'react';
import { Context } from './store';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const ContextProvider = ({ children }: Props): JSX.Element => {
  const [start, setStart] = useState(false);

  const value = useMemo(
    () => ({
      start,
      setStart,
    }),
    [start],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
