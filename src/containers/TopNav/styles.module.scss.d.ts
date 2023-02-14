export type Styles = {
  home: string;
  scoreBoard: string;
  topNav: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
