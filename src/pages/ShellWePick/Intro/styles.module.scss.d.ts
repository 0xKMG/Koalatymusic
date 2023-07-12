export type Styles = {
  button: string;
  level: string;
  outer: string;
  spectrum: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
