import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Categories } from "@/components/sections/Categories";
import { Footer } from "@/components/shared/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <HowItWorks />
      <Categories />
      <Footer />
    </>
  );
}
