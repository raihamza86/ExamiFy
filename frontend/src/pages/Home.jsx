    import React from 'react'
import MainLayout from '../layout/MainLayout'
import Banner from './Banner'

import Dashboard from './Dashboard'
import BlogSection from './BlogSection'
import QuizSection from './QuizSection'
import PPSCSection from './PpscMcqsSection'

    
    
    const Home = () => {
      return (
        <MainLayout>
        <Banner/>
        
        <PPSCSection/>
        
        <Dashboard/>
        
        <QuizSection/>
        <BlogSection/>
        
      
        
        </MainLayout>
      )
    }
    
    export default Home