export type Styles = {
  fadeIn: string;
  shellletter: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
