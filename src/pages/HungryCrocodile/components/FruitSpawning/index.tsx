import { Apple, FruitStar, Grape, Orange, Peach, Pear, Pineapple } from 'assets/svgs';
import { useWindowSize } from 'hooks';
import { HTMLAttributes, memo } from 'react';
import { FruitTypes, IFruitNode } from 'types';

export interface IFruitSpawningProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id'>,
    IFruitNode {
  fruitRef: (ref: HTMLDivElement) => void;
}

export const FruitSpawning = memo<IFruitSpawningProps>(
  ({ fruit, fruitRef, id, isStar, positionY, score, type, ...props }) => {
    const { innerWidth } = useWindowSize();
    const fruitStyle = { width: (innerWidth / 100) * 5 };
    return (
      <div
        id={`${fruit}_${id}`}
        style={{ top: `${positionY}%` }}
        ref={fruitRef}
        custom-score={score}
        custom-type={type}
        {...props}
      >
        {
          {
            Apple: <Apple style={fruitStyle} />,
            Orange: <Orange style={fruitStyle} />,
            Grape: <Grape style={fruitStyle} />,
            Peach: <Peach style={fruitStyle} />,
            Pear: <Pear style={fruitStyle} />,
            Pineapple: <Pineapple style={fruitStyle} />,
          }[FruitTypes[fruit]]
        }
        {isStar && (
          <FruitStar
            style={{
              ...fruitStyle,
              position: 'absolute',
              bottom: '2%',
              left: '0',
            }}
          />
        )}
      </div>
    );
  },
);

FruitSpawning.displayName = 'FruitSpawning';
export default FruitSpawning;
