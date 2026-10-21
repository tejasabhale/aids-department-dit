import React from "react";
import AcademicsHero from "../../components/academics/AcademicsHero";
import LatestAcademicNotices from "../../components/academics/LatestAcademicNotices";
import CurriculumExplorer from "../../components/academics/CurriculumExplorer";
import PracticalLearningProjects from "../../components/academics/PracticalLearningProjects";

const Academics = () => {
  return (
    <>
      <AcademicsHero />
      <LatestAcademicNotices />
      <CurriculumExplorer />
      <PracticalLearningProjects />
    </>
  );
};

export default Academics;
