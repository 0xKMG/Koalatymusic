export type Styles = {
  game: string;
  gameList: string;
  gameListItem: string;
  menu: string;
  wood: string;
  woodContainer: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
