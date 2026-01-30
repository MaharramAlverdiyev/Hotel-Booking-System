import React from 'react'
import  Booking  from './pages/Booking'
import HotelsDaily from './pages/HotelsDaily'
import FinallyBooking from './pages/FinallyBooking'
import "../src/App.css"


const App = () => {
  return (
    <div className='hotel-booking-system'>
    <div className="left-section">
      <Booking />
      <HotelsDaily/>
      </div>
      <div className="right-finally">
      <FinallyBooking/>
      </div>
    </div>
  )
}

export default App