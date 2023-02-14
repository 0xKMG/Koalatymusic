import { createContext, Dispatch, SetStateAction } from 'react';

interface Props {
  start: boolean;
  setStart: Dispatch<SetStateAction<boolean>>;
}

export const Context = createContext({} as Props);

export default Context;
