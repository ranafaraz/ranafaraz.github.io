import { MotionConfig } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { useReducedMotion } from './hooks/useReducedMotion';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TechMarquee from './components/TechMarquee';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Research from './sections/Research';
import Contact from './sections/Contact';

export default function App() {
  const { theme, toggle } = useTheme();
  const reduced = useReducedMotion();

  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <Loader />
      <CustomCursor />
      <ScrollProgress />

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
    </MotionConfig>
  );
}
