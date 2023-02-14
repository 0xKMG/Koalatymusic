export type Styles = {
  disabled: string;
  inner: string;
  outer: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
