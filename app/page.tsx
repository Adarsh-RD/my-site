import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { FloatingObjects } from '@/components/floating-objects';
import { ScrollProgress } from '@/components/scroll-progress';
import { HangingSpiderman } from '@/components/hanging-spiderman';

export default function Home() {
  return (
    <main className="bg-background text-foreground relative grid-bg">
      <FloatingObjects />
      <ScrollProgress />
      <Navbar />
      <HangingSpiderman />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
