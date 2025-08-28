import React from 'react'
import CafeList from './components/CafeList'
import Paid from '@/components/Paid'
import Footer from '@/components/layout/Footer'
const page = () => {
  return (
    <div className='p-2'>
      <Paid/>
      <CafeList/>
      <Footer/>
    </div>
  )
}

export default page
