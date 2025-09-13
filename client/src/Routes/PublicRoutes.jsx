// src/Routes/PublicRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import Layout from "../Modules/Homepage/Layout/Layout";
import Homepage from "./Homepage";
import Jobsection from "../Modules/Homepage/Pages/Job/Jobsection";
import Companiesection from "../Modules/Homepage/Pages/Company/Companysection";


export const publicRoutes = [
  {
    path: "/",
    element: (
      <Layout>
        <Homepage/>
      </Layout>
    ),
  },
  {
    path: "/job",
    element: (
      <Layout>
       <Jobsection/>
      </Layout>
    ),
  },
  {
    path: "/company",
    element: (
      <Layout>
        <Companiesection/>
      </Layout>
    ),
  },
 
];
