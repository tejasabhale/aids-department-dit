import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Academics from "../pages/Academics/Academics";
import Faculty from "../pages/Faculty/Faculty";
import Research from "../pages/Research/Research";
import StudentLife from "../pages/StudentLife/StudentLife";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/research" element={<Research />} />
        <Route path="/student-life" element={<StudentLife />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
