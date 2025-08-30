import HeroSection from "../components/HeroSection";
import ProfileSection from "../components/ProfileSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";

export default function Home() {
  const seededEmail = "princedoriya691@gmail.com";

  return (
    <main className="font-body">
      <HeroSection />
      <ProfileSection email={seededEmail} />
      <SkillsSection />
      <ProjectsSection />
    </main>
  );
}
