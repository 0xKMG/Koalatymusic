import {
  PurpleShell,
  BlueShell,
  YellowShell,
  OrangeShell,
  PinkShell,
  SunShell,
  GreenShell,
} from 'assets/svgs';
import { useWindowSize } from 'hooks';
import { HTMLAttributes, memo, useEffect, useState } from 'react';
import { ShellTypes, ShellNode } from 'types';
import styles from './styles.module.scss';

export interface IShellSpawningProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id'>,
    ShellNode {
  ShellRef: (ref: HTMLDivElement) => void;
  Onlclick: (id: number) => void;
}

export const ShellSpawning = memo<IShellSpawningProps>(
  ({ ShellRef, id, positionY, positionX, letter, shell, Onlclick, ...props }) => {
    const { innerWidth } = useWindowSize();
    const shellWidth = (innerWidth / 100) * 5;
    const spectrumWidthPercentage = 62; // Adjust the percentage as needed

    const spectrumWidth = (innerWidth * spectrumWidthPercentage) / 100;
    const mainmaxPositionX = spectrumWidth - shellWidth;
    const mainminPositionX = -shellWidth;
    const [currentPositionX, setCurrentPositionX] = useState(positionX);
    const [cancelAnimation, setCancelAnimation] = useState(false);
    const shellStyle = {
      width: shellWidth,
      top: `${positionY}%`,
      right: `${currentPositionX}px`, // Use 'px' instead of '%' for left property
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        Onlclick(id);
      }
    };
    useEffect(() => {
      const maxPositionX = mainmaxPositionX;
      const minPositionX = mainminPositionX;
      let increment = 1.5; // Adjust the increment value to control the speed of movement
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
        if (cancelAnimation === false) {
          // Continue animation only if cancelAnimation is false
          requestAnimationFrame(animateShells);
        }
      };
      const animationFrameId = requestAnimationFrame(animateShells);
      return () => {
        if (animationFrameId !== null) {
          setCancelAnimation(true);
          cancelAnimationFrame(animationFrameId);
        }
      };
    }, [positionX]);
    return (
      <div
        id={`${shell}_${id}`}
        style={shellStyle}
        custom-score={letter}
        ref={ShellRef}
        onClick={() => Onlclick(id)}
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
            Green: <GreenShell style={shellStyle} />,
            Sun: <SunShell style={shellStyle} />,
            Pink: <PinkShell style={shellStyle} />,
            Orange: <OrangeShell style={shellStyle} />,
          }[ShellTypes[shell]]
        }
        <div className={styles.shellletter}>{letter}</div>
      </div>
    );
  },
);

ShellSpawning.displayName = 'ShellSpawning';
export default ShellSpawning;
