import React from "react";
import ResearchOverviewHero from "../../components/research/ResearchOverviewHero";
import ResearchAreas from "../../components/research/ResearchAreas";
import ResearchPublications from "../../components/research/ResearchPublications";
import ResearchLabsFacilities from "../../components/research/ResearchLabsFacilities";
import StudentResearchInnovation from "../../components/research/StudentResearchInnovation";

const Research = () => {
  return (
    <>
      <ResearchOverviewHero />
      <ResearchAreas />
      <ResearchPublications />
      <ResearchLabsFacilities />
      <StudentResearchInnovation />
    </>
  );
};

export default Research;
