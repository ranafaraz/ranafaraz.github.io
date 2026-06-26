import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { useReducedMotion } from './hooks/useReducedMotion';
import HomePage from './pages/HomePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Uses from './pages/Uses';
import Now from './pages/Now';
import NotFound from './pages/NotFound';

export default function App() {
  const reduced = useReducedMotion();

  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/uses" element={<Uses />} />
          <Route path="/now" element={<Now />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}
