import React from "react";
import StudentLifeHero from "../../components/student/StudentLifeHero";
import StudentCommunitiesClubs from "../../components/student/StudentCommunitiesClubs";
import EventsActivities from "../../components/student/EventsActivities";
import StudentAchievements from "../../components/student/StudentAchievements";

const StudentLife = () => {
  return (
    <>
      <StudentLifeHero />
      <StudentCommunitiesClubs />
      <EventsActivities />
      <StudentAchievements />
    </>
  );
};

export default StudentLife;
