import React from 'react'
import MainLayout from '../layout/MainLayout'
import { AlignHorizontalDistributeCenter } from 'lucide-react'
import AboutBanner from './AboutBanner'
import Aboutdetail from './Aboutdetail'

import StudyMaterial from './StudyMaterial'

const About = () => {
  return (
    <MainLayout>
      <AboutBanner/>
      <Aboutdetail/>
      <StudyMaterial/>
    </MainLayout>
  )
}

export default About