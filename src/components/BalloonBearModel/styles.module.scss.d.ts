export type Styles = {
  container: string;
  happy: string;
  sad: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
