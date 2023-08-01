export enum ShellTypes {
    Purple,
    Blue,
    Yellow,
    // Pineapple,
  }

export interface ShellNode {
    id: number;
    shell: ShellTypes;
    positionY: number;
    positionX: number;
    score: number;
    // spectrumWidth: number;
  }
