/// <reference types="react-scripts" />
declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const content: string;
  export default content;
}
