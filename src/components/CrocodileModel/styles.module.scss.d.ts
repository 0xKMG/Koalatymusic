export type Styles = {
  controller: string;
  crocodile: string;
  crocodileModel: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
