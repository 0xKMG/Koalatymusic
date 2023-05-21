export type Styles = {
  disabled: string;
  imageResponsive: string;
  inner: string;
  outer: string;
  pauseOverlay: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
