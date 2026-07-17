import Hero from '@/components/Hero';
import TheFirm from '@/components/TheFirm';
import FamilySection from '@/components/FamilySection';
import Services from '@/components/Services';
import OurCompanies from '@/components/OurCompanies';
import Markets from '@/components/Markets';
import Contact from '@/components/Contact';
import ScrollFx from '@/components/ScrollFx';

export default function Home() {
  return (
    <>
      <ScrollFx />
      <Hero />
      <TheFirm />
      <FamilySection />
      <Services />
      <OurCompanies />
      <Markets />
      <Contact />
    </>
  );
}
