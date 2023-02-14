export type Styles = {
  buttonArea: string;
  content: string;
  contentRight: string;
  model: string;
  modelAspect: string;
  overlay: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
