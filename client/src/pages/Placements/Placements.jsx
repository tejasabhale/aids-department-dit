import React from "react";
import PlacementsHero from "../../components/placements/PlacementsHero";
import PlacementStatistics from "../../components/placements/PlacementStatistics";
import RecruitersIndustryPartners from "../../components/placements/RecruitersIndustryPartners";
import StudentSuccessStories from "../../components/placements/StudentSuccessStories";

const Placements = () => {
  return (
    <>
      <PlacementsHero />
      <PlacementStatistics />
      <RecruitersIndustryPartners />
      <StudentSuccessStories />
    </>
  );
};

export default Placements;
