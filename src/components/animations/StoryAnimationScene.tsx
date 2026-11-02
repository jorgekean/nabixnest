import React from 'react';
import type { Story } from '../../data/stories';
import { BarnabyNarratedStorybook } from './BarnabyNarratedStorybook';
import { LunaOwlStorybook } from './LunaOwlStorybook';
import { OliverOtterStorybook } from './OliverOtterStorybook';
import { ZunoFoxStorybook } from './ZunoFoxStorybook';
import { SammyTurtleStorybook } from './SammyTurtleStorybook';
import { DaisyDinoStorybook } from './DaisyDinoStorybook';
import { AnimatedStorybookSuite } from './AnimatedStorybookSuite';

interface StoryAnimationSceneProps {
  story: Story;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

export const StoryAnimationScene: React.FC<StoryAnimationSceneProps> = ({
  story,
  isPlaying,
  currentTime,
  duration,
}) => {
  switch (story.id) {
    case 'barnaby-bear':
      return (
        <BarnabyNarratedStorybook
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
        />
      );

    case 'luna-owl':
      return (
        <LunaOwlStorybook
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
        />
      );

    case 'oliver-otter':
      return (
        <OliverOtterStorybook
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
        />
      );

    case 'zuno-nap':
      return (
        <ZunoFoxStorybook
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
        />
      );

    case 'sammy-turtle':
      return (
        <SammyTurtleStorybook
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
        />
      );

    case 'daisy-dinosaur':
      return (
        <DaisyDinoStorybook
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
        />
      );

    default:
      // Handles all other stories with dedicated character stages & synchronized narration acts
      return (
        <AnimatedStorybookSuite
          story={story}
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
        />
      );
  }
};
