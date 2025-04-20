// import { useState } from 'react'
import { Link } from 'react-router'
import './App.css'

function HomePage() {
  // const [] = useState(0)

  return (
    <>
    <nav>
      <Link to={'/create'}>New</Link>
      
    </nav>
      <h1>HomePage</h1>
    </>
  )
}

export default HomePage
