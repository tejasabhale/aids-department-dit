import React from "react";
import Stats from "../../components/home/Stats";
import Hero from "../../components/home/Hero";
import ThrustAreas from "../../components/home/ThrustAreas";
import RecruitersCarousel from "../../components/home/RecruitersCarousel";
import AchievementsHighlights from "../../components/home/AchievementsHighlights";
import HODMessage from "../../components/home/HODMessage";

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <HODMessage />
      <AchievementsHighlights />
      <ThrustAreas />
      <RecruitersCarousel />
    </>
  );
};

export default Home;
