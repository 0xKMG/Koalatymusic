export type Styles = {
  bottomNav: string;
  home: string;
  scoreBoard: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
