import { useCallback, useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import H5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';
import { BACKGROUND_MUSIC, PagesPathType } from 'constant';
import { Logo } from 'assets/svgs';
import classNames from 'classnames';
import styles from './styles.module.scss';

export const AudioController = (): JSX.Element => {
  const audioRef = useRef<H5AudioPlayer>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [start, setStart] = useState<boolean>(false);

  const handlePlayedEnd = useCallback(() => {
    if (location.pathname === '/') {
      setStart(true);
      navigate('./menu');
    } else {
      audioRef.current?.audio.current?.play();
    }
  }, [location.pathname, navigate]);

  return (
    <div className={classNames({ [styles.hidden]: start })}>
      <H5AudioPlayer
        onEnded={handlePlayedEnd}
        showJumpControls={false}
        customIcons={{
          play: <Logo width="100%" height="100%" />,
          pause: <span />,
        }}
        src={BACKGROUND_MUSIC[location.pathname as PagesPathType]}
        ref={audioRef}
      />
    </div>
  );
};

export default AudioController;
