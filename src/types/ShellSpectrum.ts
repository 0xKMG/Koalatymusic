export enum ShellSpectrum {
    Treble,
    Bass,
  }

export type ShellSpectrumName = keyof typeof ShellSpectrum;

export default ShellSpectrum;
