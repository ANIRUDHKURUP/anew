import CinematicJourney from "@/components/CinematicJourney";
import EmpireSection from "@/components/EmpireSection";
import BooksSection from "@/components/BooksSection";
import FinalSection from "@/components/FinalSection";
import ScrollUI from "@/components/ScrollUI";

export default function Home() {
  return (
    <>
      {/* Top progress bar — appears after the cinematic journey */}
      <ScrollUI />

      <main>
        {/*
          700vh cinematic scroll journey:
          Title card → Street → Construction → Ambulance → Observation → Studying → Detective reveal
          All crossfade seamlessly via scroll-driven opacity + Ken Burns
        */}
        <CinematicJourney />

        {/* After the journey — conversion sections */}
        <EmpireSection />
        <BooksSection />
        <FinalSection />
      </main>
    </>
  );
}
