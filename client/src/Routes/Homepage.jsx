import React from 'react'
import Header from '../Modules/Homepage/Layout/Header'
import Hero from '../Modules/Homepage/Pages/Hero'
import CategorySection from '../Modules/Homepage/Pages/Categorysection'
import JobGrid from '../Modules/Homepage/Pages/Jobgrid'
import CompanyGrid from '../Modules/Homepage/Pages/CompanyGrid'
import Testimonials from '../Modules/Homepage/Pages/Testimonial'

const Homepage = () => {
  return (
    <div>
        <Hero/>
        <CategorySection/>
        <JobGrid/>
        <CompanyGrid/>
        <Testimonials/>
    </div>
  )
}

export default Homepage