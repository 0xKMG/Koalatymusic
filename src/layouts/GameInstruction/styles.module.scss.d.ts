export type Styles = {
  balloon: string;
  button: string;
  content: string;
  disabled: string;
  home: string;
  instruction: string;
  instructionArea: string;
  start: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
