import menu from 'assets/audio/Put_a_Smile_On.mp3';
import crocodileIntro from 'assets/audio/Kids_are_Happy.mp3';
import crocodile from "assets/audio/Funny_Children's_Games.mp3";
import balloon from 'assets/audio/CheerfulUkulele_146_Ending_JHungerMusic.mp3';
import balloonIntro from 'assets/audio/Casual_Funny_Children_Game.mp3';
import splashScreenAudio from 'assets/audio/Splash_Screen.mp3';

export enum PagesPath {
  SplashScreen = '/',
  Menu = '/menu',
  Crocodile = '/HungryCrocodile',
  CrocodileIntro = '/HungryCrocodile/intro',
  Balloon = '/BalloonParty',
  BalloonIntro = '/BalloonParty/intro',
}

export type PagesPathType = `${PagesPath}`;

export const BACKGROUND_MUSIC: Partial<Record<PagesPathType, string>> = {
  [PagesPath.SplashScreen]: splashScreenAudio,
  [PagesPath.Menu]: menu,
  [PagesPath.Crocodile]: crocodile,
  [PagesPath.CrocodileIntro]: crocodileIntro,
  [PagesPath.Balloon]: balloon,
  [PagesPath.BalloonIntro]: balloonIntro,
};

export default BACKGROUND_MUSIC;
