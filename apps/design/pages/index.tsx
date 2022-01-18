import React from 'react'
import { ShellLayout } from '@/components/layouts/shell'
import { Hero } from '@/components/hero'
import { Toolbar } from '@/components/toolbar'

export const Home = () => {
  return (
    <ShellLayout
      showFooter={false}
      header={(
        <>
          <Toolbar />
          <Hero />
        </>
      )}
    />
  )
}

export default Home
