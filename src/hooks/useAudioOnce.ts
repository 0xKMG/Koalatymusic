import { useCallback, useState } from 'react';
import useSound from 'use-sound';

export interface IUseAudioEffectProps {
  source: string;
  onFinish?: () => void;
}

interface UseAudioEffectReturn {
  play: () => void;
}

export const useAudioOnce = ({ source, onFinish }: IUseAudioEffectProps): UseAudioEffectReturn => {
  const [clicked, setClicked] = useState(false);
  const [play] = useSound(source, {
    onend: onFinish,
  });

  const handlePlay = useCallback(() => {
    if (!clicked) {
      setClicked(true);
      play();
    }
  }, [clicked, play]);

  return { play: handlePlay };
};

export default useAudioOnce;
