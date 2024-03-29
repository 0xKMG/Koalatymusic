export enum ShellTypes {
  Purple,
  Blue,
  Yellow,
  Green,
  Sun,
  Pink,
  Orange,
}

export interface ShellNode {
  id: number;
  shell: ShellTypes;
  positionY: number;
  positionX: number;
  letter: string;
  // spectrumWidth: number;
}
