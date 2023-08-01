import { memo } from 'react';
import audioEffect from 'assets/audio/Game_Menu_Click.mp3';
import { useAudioOnce } from 'hooks';
// import { useNavigate } from 'react-router-dom';
import { ImageButton, ScoreBoard } from 'components';
import { Home } from 'assets/svgs';
import styles from './styles.module.scss';

export interface IBottomNavProps {
  scoreBoard?: boolean;
  time?: number;
  score?: number;
}

export const BottomNav = memo<IBottomNavProps>(({ time, score, scoreBoard }) => {
  // const navigate = useNavigate();

  const { play } = useAudioOnce({
    source: audioEffect,
  });

  const handleHomeClick = () => {
    play();
    window.location.href = 'https://www.koalatymusic.com/';
  };

  return (
    <div className={styles.bottomNav}>
      <ImageButton className={styles.home} onClick={handleHomeClick}>
        <Home />
      </ImageButton>
      {scoreBoard && (
        <div className={styles.scoreBoard}>
          <ScoreBoard time={time} score={score} />
        </div>
      )}
    </div>
  );
});

BottomNav.displayName = 'BottomNav';
export default BottomNav;
