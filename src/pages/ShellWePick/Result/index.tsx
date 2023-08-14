import { useGameScore } from 'hooks';
import background from 'assets/images/Hungry_Crocodile_Game_Intro_Background.png';
import { EndingKoala, TopNav } from 'containers';
import { BackgroundImage } from 'components';
import { KoalaType } from 'containers/EndingKoala/models';
import { SCORE_LIMIT } from 'constant';

export const ShellWePickResult = (): JSX.Element => {
  const { score } = useGameScore('shellWePick');
  console.log(score);
  const modelType = KoalaType[score < SCORE_LIMIT ? 'ThumbUp' : 'Salute'];
  return (
    <BackgroundImage source={background}>
      <TopNav score={score} scoreBoard />
      <EndingKoala path="/ShellWePick/intro" model={modelType} scale={0.8} />
    </BackgroundImage>
  );
};

export default ShellWePickResult;
