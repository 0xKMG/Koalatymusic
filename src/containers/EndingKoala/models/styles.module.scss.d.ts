export type Styles = {
  koala: string;
  koalaNiceTry: string;
  koalaWellDone: string;
  model: string;
  wood: string;
  woodContent: string;
  woodNiceTry: string;
  woodWellDone: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
