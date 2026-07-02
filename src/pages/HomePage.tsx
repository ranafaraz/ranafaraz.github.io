import { Suspense, lazy } from 'react';
import Loader from '../components/Loader';
import CustomCursor from '../components/CustomCursor';
import ScrollProgress from '../components/ScrollProgress';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TechMarquee from '../components/TechMarquee';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import Research from '../sections/Research';
import Contact from '../sections/Contact';
import { useTheme } from '../hooks/useTheme';
import { useQualityTier } from '../hooks/useQualityTier';
import { useScrollStory } from '../hooks/useScrollStory';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

// Lazy so the whole WebGL + postprocessing bundle never blocks first paint.
const ExperienceCanvas = lazy(() => import('../three/ExperienceCanvas'));

export default function HomePage() {
  const { theme, toggle } = useTheme();
  const settings = useQualityTier();
  useScrollStory();
  useSmoothScroll(settings.tier !== 'off');

  return (
    <>
      <Loader />
      <CustomCursor />
      <ScrollProgress />

      {/* One persistent 3D world fixed behind the whole page. */}
      {settings.tier !== 'off' ? (
        <Suspense fallback={null}>
          <ExperienceCanvas initial={settings} />
        </Suspense>
      ) : (
        // Reduced-motion / low-power: calm static backdrop, no WebGL.
        <div
          aria-hidden
          className="fixed inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.22),transparent_60%),radial-gradient(40%_40%_at_80%_20%,rgba(34,211,238,0.16),transparent_55%)]"
        />
      )}

      <div className="grain relative min-h-screen">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-cyan focus:px-4 focus:py-2 focus:text-void"
        >
          Skip to content
        </a>

        <Navbar theme={theme} toggleTheme={toggle} />

        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Research />
          <TechMarquee />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
