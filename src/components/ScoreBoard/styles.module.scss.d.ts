export type Styles = {
  area: string;
  score: string;
  scoreBoard: string;
  star: string;
  timer: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
