export type Styles = {
  crocodileGame: string;
  end: string;
  fruits: string;
  gameArea: string;
  home: string;
  itemMove: string;
  model: string;
  paused: string;
  scaled: string;
  scoreBoard: string;
  spectrum: string;
  top: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
