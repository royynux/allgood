'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Drawer from '@/components/layout/Drawer'
import Footer from '@/components/layout/Footer'
import BottomNav from '@/components/layout/BottomNav'
import HeroSection from '@/components/home/HeroSection'
import WhyUsSection from '@/components/home/WhyUsSection'
import TrendingTrips from '@/components/home/TrendingTrips'
import PopularTrips from '@/components/home/PopularTrips'
import HowToBook from '@/components/home/HowToBook'
import GallerySection from '@/components/home/GallerySection'
import TestimonialsSection from '@/components/home/TestimonialsSection'

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <Navbar onDrawerOpen={() => setDrawerOpen(true)} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main className="page-body">
        <HeroSection />
        <WhyUsSection />
        <TrendingTrips />
        <PopularTrips />
        <HowToBook />
        <GallerySection />
        <TestimonialsSection />
      </main>
      <Footer />
      <BottomNav />
    </>
  )
}
