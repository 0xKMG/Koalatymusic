export type Styles = {
  balloons: string;
  bass: string;
  clef: string;
  clefBass: string;
  clefTreble: string;
  hidden: string;
  highlight: string;
  hint: string;
  misMatch: string;
  shadow: string;
  staff: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
