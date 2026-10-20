import React from "react";
import AboutHero from "../../components/about/AboutHero";
import DepartmentOverview from "../../components/about/DepartmentOverview";
import VisionMission from "../../components/about/VisionMission";
import ClosingCTA from "../../components/about/ClosingCTA";

const About = () => {
  return (
    <>
      <AboutHero />
      <DepartmentOverview />
      <VisionMission />
      <ClosingCTA />
    </>
  );
};

export default About;
