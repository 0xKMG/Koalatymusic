import { useContext, useEffect } from 'react';
import { Context } from 'context/store';
import { Logo } from 'assets/svgs';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

const SplashScreen = (): JSX.Element => {
  const navigate = useNavigate();
  const { setStart } = useContext(Context);

  useEffect(() => {
    setStart(true);
  }, []);

  const gameSelection = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.splashScreen}>
      <div className={styles.logo}>
        <button type="button" onClick={() => gameSelection('/menu')}>
          <Logo width="100%" />
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
