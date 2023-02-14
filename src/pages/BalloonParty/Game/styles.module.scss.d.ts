export type Styles = {
  balloonGame: string;
  bearContainer: string;
  flyingBee: string;
  gameArea: string;
  helpButton: string;
  staff: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
