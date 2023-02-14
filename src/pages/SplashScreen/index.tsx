import { useContext, useEffect } from 'react';
import { Context } from 'context/store';
import { Logo } from 'assets/svgs';
import styles from './styles.module.scss';

const SplashScreen = (): JSX.Element => {
  const { setStart } = useContext(Context);

  useEffect(() => {
    setStart(true);
  }, []);

  return (
    <div className={styles.splashScreen}>
      <div className={styles.logo}>
        <button type="button">
          <Logo width="100%" />
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
