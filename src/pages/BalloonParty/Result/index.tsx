import background from 'assets/images/Balloon_Party_Game_Intro_Background.png';
import { EndingKoala, TopNav } from 'containers';
import { BackgroundImage } from 'components';
import { KoalaType } from 'containers/EndingKoala/models';

export const BalloonPartyResult = (): JSX.Element => {
  const modelType = KoalaType.Salute;
  return (
    <BackgroundImage source={background}>
      <TopNav />
      <EndingKoala path="/BalloonParty/intro" model={modelType} scale={0.8} />
    </BackgroundImage>
  );
};

export default BalloonPartyResult;
