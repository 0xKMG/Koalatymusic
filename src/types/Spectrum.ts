export enum Spectrum {
  Treble,
  Bass,
}

export type SpectrumName = keyof typeof Spectrum;

export default Spectrum;
