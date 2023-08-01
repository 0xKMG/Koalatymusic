import { AnswerFish } from 'assets/svgs';
  import { memo } from 'react';
  import styles from './styles.module.scss';

  export enum AnswerFishLettter {
    A,
    //  more letters
  }

  export interface IAnswerFishModelProps {
    letter?: AnswerFishLettter;
  }

  export const AnswerFishModel = memo<IAnswerFishModelProps>(({ letter = 0 }) => (
    <div className={styles.fishModel}>
      <div className={styles.text}>

        {
          {
            [AnswerFishLettter.A]: <div> A </div>,
            //  more letters
          }[letter]
        }

      </div>
      <div className={styles.fish}>
        <AnswerFish />
      </div>
    </div>
  ));

  AnswerFishModel.displayName = 'AnswerFishModel';
  export default AnswerFishModel;
