import { PurpleShell, BlueShell, YellowShell } from 'assets/svgs';
import { useWindowSize } from 'hooks';
import { HTMLAttributes, memo, useEffect, useState } from 'react';
import { ShellTypes, ShellNode } from 'types';

export interface IShellSpawningProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id'>,
  ShellNode {
  ShellRef: (ref: HTMLDivElement) => void;
  Onlclick: () => void;
}

export const ShellSpawning = memo<IShellSpawningProps>(
  ({ ShellRef, id, positionY, positionX, score, shell, Onlclick, ...props }) => {
    const { innerWidth } = useWindowSize();
    const shellWidth = (innerWidth / 100) * 5;
    const spectrumWidthPercentage = 62; // Adjust the percentage as needed

    const spectrumWidth = (innerWidth * spectrumWidthPercentage) / 100;
    const mainmaxPositionX = spectrumWidth - shellWidth;
    const mainminPositionX = -shellWidth;
    const [currentPositionX, setCurrentPositionX] = useState(positionX);
    const shellStyle = {
      width: shellWidth,
      top: `${positionY}%`,
      right: `${currentPositionX}px`, // Use 'px' instead of '%' for left property
      cursor: 'pointer',
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        Onlclick();
      }
    };
    useEffect(() => {
      const maxPositionX = mainmaxPositionX;
      const minPositionX = mainminPositionX;
      let increment = 1; // Adjust the increment value to control the speed of movement
      let currentPositionX = positionX; // Start with the initial positionX prop value
      const animateShells = () => {
        if (currentPositionX >= maxPositionX) {
          // If reached max position, change direction to move left
          currentPositionX = maxPositionX;
          increment = -Math.abs(increment); // Make the increment negative to move left
        } else if (currentPositionX <= minPositionX) {
          // If reached min position, change direction to move right
          currentPositionX = minPositionX;
          increment = Math.abs(increment); // Make the increment positive to move right
        }
        currentPositionX += increment;
        setCurrentPositionX(currentPositionX);
        requestAnimationFrame(animateShells);
      };
      const animationFrameId = requestAnimationFrame(animateShells);
      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }, [positionX]);
    return (
      <div
        id={`${shell}_${id}`}
        style={shellStyle}
        ref={ShellRef}
        custom-score={score}
        onClick={Onlclick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        {...props}
      >
        {
          {
            Blue: <BlueShell style={shellStyle} />,
            Yellow: <YellowShell style={shellStyle} />,
            Purple: <PurpleShell style={shellStyle} />,
          }[ShellTypes[shell]]
        }
        <div
          style={{
          position: 'absolute',
          left: '30%',
          bottom: '25%',
          fontSize: '3vw',
          color: 'black',
          opacity: '0.5',
        }}
        >
          {/* {' '} */}
          A
        </div>
      </div>
    );
  },
);

ShellSpawning.displayName = 'ShellSpawning';
export default ShellSpawning;
