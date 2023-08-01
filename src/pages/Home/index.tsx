import woodBall from 'assets/images/Balloon_Party_Wood.png';
import Ball from 'assets/images/Balloon_Party_Thumbnail.png';
import woodCroc from 'assets/images/Hungry_Crocodile_Wood.png';
import Croc from 'assets/images/Hungry_Crocodile_Thumbnail.png';
import Shell from 'assets/images/Shellwethumbnail.png';
import { GameList, MenuBackground } from 'assets/svgs';
import classNames from 'classnames';
import { ImageButton, SvgBackground } from 'components';
import { useNavigate } from 'react-router-dom';
import audioEffect from 'assets/audio/Game_Menu_Click.mp3';
import { useAudioOnce } from 'hooks';
import styles from './styles.module.scss';

const Home = (): JSX.Element => {
  const navigate = useNavigate();

  const { play } = useAudioOnce({
    source: audioEffect,
  });

  const gameSelection = (path: string) => {
    play();
    navigate(path);
  };

  return (
    <SvgBackground svgImage={<MenuBackground />}>
      <div className={styles.menu}>
        <div className={styles.gameList}>
          <GameList style={{ width: '100%' }} />
        </div>
        <div className={classNames(styles.gameList, styles.woodContainer)}>
          <ImageButton onClick={() => gameSelection('/HungryCrocodile/intro')}>
            <img src={woodCroc} className={styles.wood} alt="Hungry Crocodile_Wood" />
            <div className={styles.gameListItem} style={{ marginTop: '2%' }}>
              <img
                src={Croc}
                alt="Hungry_Crocodile"
                style={{ height: 'calc(100% / 1218 * 564)' }}
              />
              <div className={styles.game}>
                Hungry Alligator:
                <br />
                Line & Space Notes
              </div>
            </div>
          </ImageButton>
          <ImageButton onClick={() => gameSelection('/BalloonParty/intro')}>
            <img src={woodBall} className={styles.wood} alt="Balloon_Party_Wood" />
            <div className={styles.gameListItem} style={{ marginTop: '1%' }}>
              <img src={Ball} alt="Balloon_Party" style={{ height: 'calc(100% / 1090 * 538)' }} />
              <div className={styles.game}>
                Balloon Party:
                <br />
                Note spelling
              </div>
            </div>
          </ImageButton>
          <ImageButton onClick={() => gameSelection('/ShellWePick/intro')}>
            <img src={woodCroc} className={styles.wood} alt="Balloon_Party_Wood" />
            <div className={styles.gameListItem} style={{ marginTop: '3%' }}>
              <img src={Shell} alt="Balloon_Party" style={{ height: 'calc(100% / 1090 * 538)' }} />
              <div className={styles.game}>
                Shell We Pick:
                <br />
                Music notes
              </div>
            </div>
          </ImageButton>
        </div>
      </div>
    </SvgBackground>
  );
};

export default Home;
