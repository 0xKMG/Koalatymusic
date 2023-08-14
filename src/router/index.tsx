/* eslint-disable react/jsx-wrap-multilines */
import AudioController from 'containers/AudioController';
import BalloonPartyProvider from 'context/BalloonParty';
import { BalloonPartyIntro, BalloonPartyGame, BalloonPartyResult } from 'pages/BalloonParty';
import {
  HungryCrocodileGame,
  HungryCrocodileIntro,
  HungryCrocodileResult,
  HungryCrocodileInstruction,
} from 'pages/HungryCrocodile';

import {
  ShellWePickGame,
  ShellWePickIntro,
  ShellWePickResult,
  ShallWePickInstruction,
} from 'pages/ShellWePick';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SplashScreen from '../pages/SplashScreen';
// import ProtectedRoutes from './ProtectedRoutes';

const Router = (): JSX.Element => (
  <BrowserRouter>
    {/* BGM controller */}
    <AudioController />
    <Routes>
      <Route index element={<SplashScreen />} />

      <Route path="/menu" element={<Home />} />
      <Route path="/BalloonParty/">
        <Route
          index
          element={
            <BalloonPartyProvider>
              <BalloonPartyGame />
            </BalloonPartyProvider>
          }
        />
        <Route path="intro" element={<BalloonPartyIntro />} />
        <Route path="result" element={<BalloonPartyResult />} />
      </Route>
      <Route path="/HungryCrocodile/">
        <Route index element={<HungryCrocodileGame />} />
        <Route path="intro" element={<HungryCrocodileIntro />} />
        <Route path="result" element={<HungryCrocodileResult />} />
        <Route path="instruction" element={<HungryCrocodileInstruction />} />
      </Route>
      <Route path="/ShellWePick/">
        <Route index element={<ShellWePickGame />} />
        <Route path="intro" element={<ShellWePickIntro />} />
        <Route path="result" element={<ShellWePickResult />} />
        <Route path="instruction" element={<ShallWePickInstruction />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
export default Router;
