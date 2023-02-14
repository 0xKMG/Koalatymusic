export type Styles = {
  answered: string;
  balloon: string;
  draggableBalloon: string;
  scale: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
